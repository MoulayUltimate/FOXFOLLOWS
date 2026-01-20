import { Platform, Service, Package, platforms } from "@/lib/products";
import { Product } from "@/lib/db";

export async function getPlatformFromDB(platformId: string, db: D1Database): Promise<Platform | undefined> {
    const staticPlatform = platforms.find((p) => p.id === platformId);
    if (!staticPlatform) return undefined;

    try {
        // Fetch all products for this platform
        const result = await db.prepare(
            "SELECT * FROM products WHERE platform = ? AND active = 1 ORDER BY quantity"
        ).bind(platformId).all<Product>();

        const dbProducts = result.results || [];

        // If no products in DB, return static platform (fallback)
        if (dbProducts.length === 0) {
            return staticPlatform;
        }

        // Clone the platform to avoid mutating the static one
        const platform: Platform = {
            ...staticPlatform,
            services: staticPlatform.services.map(service => {
                // Find products for this service
                const serviceProducts = dbProducts.filter(p => p.service === service.id);

                if (serviceProducts.length === 0) {
                    return service;
                }

                // Map DB products to packages
                const packages: Package[] = serviceProducts.map(p => ({
                    id: p.id,
                    quantity: p.quantity,
                    price: p.price,
                    originalPrice: p.original_price,
                    popular: p.is_popular === 1,
                    bestValue: p.is_best_value === 1,
                }));

                return {
                    ...service,
                    packages: packages.sort((a, b) => a.quantity - b.quantity)
                };
            })
        };

        return platform;
    } catch (error) {
        console.error(`Failed to fetch platform ${platformId} from DB:`, error);
        return staticPlatform;
    }
}
