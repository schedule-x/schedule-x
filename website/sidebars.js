/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Date picker',
      items: [
        'date-picker/get-started',
        'date-picker/configuration',
        {
          type: 'link',
          label: 'Demo',
          href: '/demo/date-picker',
        },
      ],
    },
  ],
}

module.exports = sidebars
