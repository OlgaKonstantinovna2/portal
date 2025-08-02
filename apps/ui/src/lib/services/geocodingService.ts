export interface GeocodingResult {
  latitude: number;
  longitude: number;
  display_name: string;
}

export interface GeocodingError {
  error: string;
  message: string;
}

class GeocodingService {
  private apiKey = '685b9d0b6557d239526791bhpad6894';
  private baseUrl = 'https://geocode.maps.co';
  private lastRequestTime = 0;
  private readonly rateLimitDelay = 1000; // 1 second between requests

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.rateLimitDelay) {
      const delayNeeded = this.rateLimitDelay - timeSinceLastRequest;
      await this.delay(delayNeeded);
    }

    this.lastRequestTime = Date.now();
  }

  async geocodeAddress(country: string, city: string): Promise<GeocodingResult | null> {
    if (!country || !city) {
      return null;
    }

    try {
      await this.checkRateLimit();

      const query = `${city}, ${country}`;
      const url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}&api_key=${this.apiKey}&format=json&limit=1`;

      const response = await fetch(url);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }

      const result = data[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        display_name: result.display_name,
      };
    } catch (error) {
      return null;
    }
  }

  async getBrowserLocation(): Promise<GeocodingResult | null> {
    if (!navigator.geolocation) {
      return null;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        });
      });

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        display_name: `Browser location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`,
      };
    } catch (error) {
      return null;
    }
  }
}

export const geocodingService = new GeocodingService();
