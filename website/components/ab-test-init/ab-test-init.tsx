'use client'

import { useEffect } from 'react'

const AB_TESTING_URL = 'https://sx-ab.netlify.app';
const EXPERIMENT_NAME = 'prefill_seats_vs_no_prefill';
const VARIANT_STORAGE_KEY = 'ab_test_variant';
const USER_ID_STORAGE_KEY = 'ab_test_user_id';

// Helper to get or create a user ID
function getUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem(USER_ID_STORAGE_KEY);
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem(USER_ID_STORAGE_KEY, userId);
  }
  return userId;
}

// Get variant assignment
async function getVariant(experimentName: string, userId: string): Promise<string> {
  try {
    const response = await fetch(`${AB_TESTING_URL}/api/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        experiment: experimentName,
        userId: userId,
      }),
    });

    if (!response.ok) {
      console.error('Failed to get A/B test variant');
      return 'A'; // Default to variant A on error
    }

    const data = await response.json();
    return data.variant;
  } catch (error) {
    console.error('A/B testing error:', error);
    return 'A'; // Default to variant A on error
  }
}

export function getStoredVariant(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(VARIANT_STORAGE_KEY);
}

export function getStoredUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(USER_ID_STORAGE_KEY);
}

export default function AbTestInit() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Check if variant is already stored
    const storedVariant = localStorage.getItem(VARIANT_STORAGE_KEY);
    
    if (storedVariant) {
      // Variant already assigned, no need to fetch again
      return;
    }

    // Initialize A/B test
    const userId = getUserId();
    
    getVariant(EXPERIMENT_NAME, userId).then(variant => {
      // Store variant in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(VARIANT_STORAGE_KEY, variant);
        console.log('A/B Test Variant assigned:', variant);
      }
    });
  }, []);

  return null; // This component doesn't render anything
}
