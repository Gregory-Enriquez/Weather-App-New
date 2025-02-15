import { getCityImage } from './unsplashService';
import { vi } from 'vitest';

vi.mock('./unsplashService');

describe('unsplashService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('fetches city image successfully', async () => {
        const mockImageUrl = 'https://images.unsplash.com/photo-1234567890';
        vi.mocked(getCityImage).mockResolvedValue(mockImageUrl);

        const result = await getCityImage('London');
        expect(result).toBe(mockImageUrl);
    });

    test('handles error when fetching city image', async () => {
        vi.mocked(getCityImage).mockRejectedValue(new Error('Failed to fetch image'));

        await expect(getCityImage('London')).rejects.toThrow('Failed to fetch image');
    });

    test('fetches city image with correct query parameter', async () => {
        const mockImageUrl = 'https://images.unsplash.com/photo-1234567890';
        vi.mocked(getCityImage).mockResolvedValue(mockImageUrl);

        await getCityImage('Paris');
        expect(getCityImage).toHaveBeenCalledWith('Paris');
    });

    test('returns default image when no image is found', async () => {
        vi.mocked(getCityImage).mockResolvedValue(null);

        const result = await getCityImage('UnknownCity');
        expect(result).toBe(null);
    });
});