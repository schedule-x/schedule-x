#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const outputIndex = args.indexOf('-o');
if (outputIndex === -1 || outputIndex === args.length - 1) {
  console.error('Usage: node generate-api.mjs -o <output-file.mdx>');
  process.exit(1);
}
const outputFile = args[outputIndex + 1];

// Map to store collected types/interfaces
const typeMap = new Map();

// Function to extract TypeScript content from a file
function extractTypeScriptContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const types = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if line has AUTO-DOCS comment (single-line or inside block comment)
      if (
        line.includes('// AUTO-DOCS') ||
        line.includes('/* AUTO-DOCS */') ||
        line === '* AUTO-DOCS' ||
        line.includes('* AUTO-DOCS')
      ) {
        let description = '';
        
        // Check if it's a multi-line comment block
        if (line.includes('/*') || line.startsWith('*')) {
          // Parse multi-line comment for description
          let commentEnd = i;
          for (let k = i; k < lines.length; k++) {
            if (lines[k].includes('*/')) {
              commentEnd = k;
              break;
            }
          }
          
          // Extract description from the comment block
          for (let k = i; k <= commentEnd; k++) {
            const commentLine = lines[k].trim();
            if (commentLine.includes('AUTO-DOCS')) {
              // Skip the AUTO-DOCS line itself
              continue;
            }
            if (commentLine.startsWith('*') || commentLine.startsWith('/*') || commentLine.startsWith('*/')) {
              // Extract text after * or remove comment markers
              const cleanLine = commentLine.replace(/^\s*\/?\*+\/?\s*/, '').trim();
              if (cleanLine) {
                description += cleanLine + ' ';
              }
            }
          }
          description = description.trim();
          
          // Update i to skip the comment block
          i = commentEnd;
        }
        
        // Look for type/interface declaration in the next 20 lines
        for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
          const nextLine = lines[j].trim();
          
          // Skip empty lines and comments
          if (!nextLine || nextLine.startsWith('//') || nextLine.startsWith('/*')) {
            continue;
          }
          
          // Check for type or interface declaration
          if (nextLine.startsWith('export ') && (nextLine.includes('interface ') || nextLine.includes('type '))) {
            const match = nextLine.match(/export\s+(?:default\s+)?(?:interface|type)\s+(\w+)/);
            if (match) {
              const typeName = match[1];
              
              // Collect the type definition
              let typeContent = '';
              let braceCount = 0;
              let inType = false;
              let isTypeAlias = nextLine.includes('type ') && !nextLine.includes('{');
              
              for (let k = j; k < lines.length; k++) {
                const currentLine = lines[k];
                
                if (!inType) {
                  if (currentLine.includes('{')) {
                    inType = true;
                    braceCount = (currentLine.match(/{/g) || []).length - (currentLine.match(/}/g) || []).length;
                  } else if (isTypeAlias && currentLine.includes('=')) {
                    // For type aliases, collect until the end of the line or semicolon
                    typeContent += currentLine + '\n';
                    break;
                  }
                } else {
                  braceCount += (currentLine.match(/{/g) || []).length - (currentLine.match(/}/g) || []).length;
                }
                
                typeContent += currentLine + '\n';
                
                if (inType && braceCount <= 0) {
                  break;
                }
              }
              
              types.push({
                name: typeName,
                content: typeContent.trim(),
                description: description,
                file: path.relative(process.cwd(), filePath)
              });
              
              break; // Stop after finding the first matching type/interface
            }
          }
        }
      }
    }
    
    return types;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

// Function to recursively find all .ts files in packages directory
function findTypeScriptFiles(dir) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findTypeScriptFiles(fullPath));
      } else if (item.endsWith('.ts') && !item.endsWith('.d.ts')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

// Function to parse TypeScript interface/type content
function parseTypeContent(content) {
  const lines = content.split('\n');
  const properties = [];
  let extendsClause = '';
  let typeKind = 'interface'; // or 'type'
  let typeAliasValue = '';
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Check for extends clause
    if (line.includes('extends ')) {
      extendsClause = line.match(/extends\s+([^{]+)/)?.[1]?.trim() || '';
    }
    
    // Check if it's a type alias
    if (line.includes('export type ')) {
      typeKind = 'type';
      
      // Extract type alias value
      const typeMatch = line.match(/export\s+type\s+\w+\s*=\s*(.+)/);
      if (typeMatch) {
        typeAliasValue = typeMatch[1].trim().replace(/;$/, '');
        
        // If it's an object literal, we'll parse it as properties instead
        if (typeAliasValue.startsWith('{')) {
          typeAliasValue = ''; // Clear it so we parse as properties
        }
      }
    }
    
    // Skip lines that are not property definitions
    if (line.startsWith('export') || line.startsWith('interface') || line.startsWith('type') || 
        line.startsWith('{') || line === '') {
      i++;
      continue;
    }
    
    // Skip closing braces
    if (line.startsWith('}')) {
      i++;
      continue;
    }
    
    // Extract property definitions
    if (line.includes(':') && !line.startsWith('//') && !line.startsWith('/*')) {
      // Handle both optional and required properties
      const propertyMatch = line.match(/^(\w+)\s*(\?)?\s*:\s*(.+)$/);
      if (propertyMatch) {
        const [, propName, optionalMark, propType] = propertyMatch;
        const isOptional = !!optionalMark;
        
        // Handle complex types that span multiple lines
        let fullType = propType.trim().replace(/,$/, '');
        
        // If the type starts with {, we need to collect the entire object
        if (fullType.startsWith('{')) {
          let braceCount = (fullType.match(/{/g) || []).length - (fullType.match(/}/g) || []).length;
          let j = i + 1;
          
          while (j < lines.length && braceCount > 0) {
            const nextLine = lines[j];
            fullType += ' ' + nextLine.trim();
            braceCount += (nextLine.match(/{/g) || []).length - (nextLine.match(/}/g) || []).length;
            j++;
          }
          
          // Update i to skip the lines we've processed
          i = j - 1;
        }
        
        // Clean up the type - remove trailing commas and extra spaces
        fullType = fullType.replace(/,\s*$/, '').replace(/\s+/g, ' ');
        
        // Format nested objects to be more readable
        if (fullType.includes('{') && fullType.includes('}')) {
          fullType = fullType.replace(/\s*{\s*/g, ' { ').replace(/\s*}\s*/g, ' } ');
        }
        
        properties.push({
          name: propName,
          type: fullType,
          optional: isOptional
        });
      }
    }
    
    i++;
  }
  
  return {
    extends: extendsClause,
    properties,
    kind: typeKind,
    typeAliasValue
  };
}

// Function to create markdown links for type references
function createTypeLinks(text, typeNames) {
  let linkedText = text;
  
  // Sort type names by length (longest first) to avoid partial matches
  const sortedTypeNames = [...typeNames].sort((a, b) => b.length - a.length);
  
  for (const typeName of sortedTypeNames) {
    // Create regex that matches the type name as a whole word
    const regex = new RegExp(`\\b${typeName}\\b`, 'g');
    // Convert Pascal case to lowercase for anchor links (e.g., CalendarEventInternal -> calendareventinternal)
    const anchorId = typeName.toLowerCase();
    linkedText = linkedText.replace(regex, `[${typeName}](#${anchorId})`);
  }
  
  return linkedText;
}

// Function to generate MDX content
function generateMDXContent(typeMap) {
  const sortedTypes = Array.from(typeMap.entries()).sort(([a], [b]) => a.localeCompare(b));
  const typeNames = sortedTypes.map(([name]) => name);
  
  let mdxContent = `# API Reference

This page contains automatically generated API docs based on selected types and interfaces from the Schedule-X packages.

`;

  for (const [typeName, typeData] of sortedTypes) {
    const parsed = parseTypeContent(typeData.content);
    
    mdxContent += `## ${typeName}

`;
    
    // Add description if present
    if (typeData.description) {
      mdxContent += `${typeData.description}

`;
    }
    
    // Add extends clause if present
    if (parsed.extends) {
      const linkedExtends = createTypeLinks(parsed.extends, typeNames);
      mdxContent += `**Extends:** ${linkedExtends}

`;
    }
    
    // Add type alias value if present (only for simple types, not object literals)
    if (parsed.kind === 'type' && parsed.typeAliasValue && !parsed.typeAliasValue.startsWith('{')) {
      const linkedTypeValue = createTypeLinks(parsed.typeAliasValue, typeNames);
      let formattedTypeValue = linkedTypeValue;
      if ((linkedTypeValue.includes('{') || linkedTypeValue.includes('[') || linkedTypeValue.includes('|') || linkedTypeValue.includes('<')) && 
          !linkedTypeValue.includes('[') && !linkedTypeValue.includes(']')) {
        formattedTypeValue = `\`${linkedTypeValue}\``;
      }
      
      mdxContent += `**Type:** ${formattedTypeValue}

`;
    }
    
    // Add properties
    if (parsed.properties.length > 0) {
      mdxContent += `### Properties

`;
      
      for (const prop of parsed.properties) {
        const linkedType = createTypeLinks(prop.type, typeNames);
        const optionalMark = prop.optional ? ' (optional)' : '';
        
        // Wrap complex types (containing braces, brackets, or special characters) in code blocks
        // But don't wrap if it contains markdown links
        let formattedType = linkedType;
        if ((linkedType.includes('{') || linkedType.includes('[') || linkedType.includes('|') || linkedType.includes('<')) && 
            !linkedType.includes('[') && !linkedType.includes(']')) {
          formattedType = `\`${linkedType}\``;
        }
        
        mdxContent += `- **${prop.name}${optionalMark}:** ${formattedType}

`;
      }
    }
    
    mdxContent += `

`;
  }
  
  return mdxContent;
}

// Main execution
async function main() {
  console.log('Scanning packages directory for TypeScript files...');
  
  const packagesDir = path.join(__dirname, '..', 'packages');
  const tsFiles = findTypeScriptFiles(packagesDir);
  
  console.log(`Found ${tsFiles.length} TypeScript files`);
  
  // Process each file
  for (const file of tsFiles) {
    const types = extractTypeScriptContent(file);
    for (const type of types) {
      typeMap.set(type.name, type);
    }
  }
  
  console.log(`Found ${typeMap.size} types/interfaces with AUTO-DOCS comments`);
  
  // Generate MDX content
  const mdxContent = generateMDXContent(typeMap);
  
  // Write to output file
  try {
    fs.writeFileSync(outputFile, mdxContent, 'utf8');
    console.log(`Successfully generated API documentation at: ${outputFile}`);
  } catch (error) {
    console.error(`Error writing output file:`, error.message);
    process.exit(1);
  }
}

main().catch(console.error); 