import { describe, it, expect } from 'vitest';
import {
  DEALS,
  CATEGORIES,
  getPublicDeals,
  getDealById,
  getDealsByCategory,
  type PublicDeal,
} from '../deals';

describe('Deals Data Layer', () => {
  describe('DEALS array', () => {
    it('should contain 36 deals (3 per category)', () => {
      expect(DEALS).toHaveLength(36);
    });

    it('should have all required properties on each deal', () => {
      DEALS.forEach(deal => {
        expect(deal).toHaveProperty('id');
        expect(deal).toHaveProperty('category');
        expect(deal).toHaveProperty('categorySlug');
        expect(deal).toHaveProperty('title');
        expect(deal).toHaveProperty('description');
        expect(deal).toHaveProperty('terms');
        expect(deal).toHaveProperty('expiry');
        expect(deal).toHaveProperty('exclusive');
        expect(typeof deal.exclusive).toBe('boolean');
        expect(deal).toHaveProperty('tier');
        expect(deal).toHaveProperty('affiliateLink');
        expect(deal).toHaveProperty('published');
        expect(typeof deal.published).toBe('boolean');
        expect(deal).toHaveProperty('createdBy');
        expect(deal).toHaveProperty('createdAt');
      });
    });

    it('should have valid tier values', () => {
      const validTiers = ['all', 'member', 'pro'];
      DEALS.forEach(deal => {
        expect(validTiers).toContain(deal.tier);
      });
    });
  });

  describe('CATEGORIES array', () => {
    it('should contain 12 categories', () => {
      expect(CATEGORIES).toHaveLength(12);
    });

    it('should have id and label properties on each category', () => {
      CATEGORIES.forEach(cat => {
        expect(cat).toHaveProperty('id');
        expect(cat).toHaveProperty('label');
        expect(typeof cat.id).toBe('string');
        expect(typeof cat.label).toBe('string');
      });
    });
  });

  describe('getPublicDeals()', () => {
    it('should return only published deals', () => {
      const publicDeals = getPublicDeals();
      publicDeals.forEach(deal => {
        expect(deal.published).toBe(true);
      });
    });

    it('should not include affiliateLink', () => {
      const publicDeals = getPublicDeals();
      publicDeals.forEach(deal => {
        expect(deal).not.toHaveProperty('affiliateLink');
      });
    });

    it('should not include createdBy', () => {
      const publicDeals = getPublicDeals();
      publicDeals.forEach(deal => {
        expect(deal).not.toHaveProperty('createdBy');
      });
    });

    it('should return array of PublicDeal type', () => {
      const publicDeals = getPublicDeals();
      expect(Array.isArray(publicDeals)).toBe(true);
    });
  });

  describe('getDealById()', () => {
    it('should return undefined for non-existent deal', () => {
      const deal = getDealById('non-existent-id');
      expect(deal).toBeUndefined();
    });

    it('should return the correct deal for existing ID', () => {
      const testDeal = DEALS[0];
      const found = getDealById(testDeal.id);
      expect(found).toBeDefined();
      expect(found?.id).toBe(testDeal.id);
    });

    it('should include affiliateLink when found (admin access)', () => {
      const testDeal = DEALS[0];
      const found = getDealById(testDeal.id);
      expect(found).toHaveProperty('affiliateLink');
    });
  });

  describe('getDealsByCategory()', () => {
    it('should return empty array for non-existent category', () => {
      const deals = getDealsByCategory('non-existent');
      expect(deals).toEqual([]);
    });

    it('should return deals for existing category', () => {
      const firstCategory = CATEGORIES[0];
      const deals = getDealsByCategory(firstCategory.id);
      expect(Array.isArray(deals)).toBe(true);
      deals.forEach(deal => {
        expect(deal.categorySlug).toBe(firstCategory.id);
      });
    });

    it('should not include unpublished deals', () => {
      const firstCategory = CATEGORIES[0];
      const deals = getDealsByCategory(firstCategory.id);
      deals.forEach(deal => {
        expect(deal.published).toBe(true);
      });
    });
  });
});
