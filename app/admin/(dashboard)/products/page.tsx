"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductsTable } from "@/components/admin/products-table";
import { toast } from "sonner";

interface Product {
    id: string;
    platform: string;
    service: string;
    name: string;
    quantity: number;
    price: number;
    active: number;
}

export default function AdminProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/admin/products");
            if (!res.ok) {
                if (res.status === 401) {
                    router.push("/admin/login");
                    return;
                }
                throw new Error("Failed to fetch products");
            }
            const data = await res.json();
            setProducts(data.products);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [router]);

    const handleUpdate = async (id: string, updates: Partial<Product>) => {
        try {
            const res = await fetch("/api/admin/products", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updates }),
            });

            if (!res.ok) throw new Error("Failed to update product");

            toast.success("Product updated");
            // Optimistic update
            setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Products</h1>
                <p className="text-muted-foreground mt-1">
                    Manage product prices and availability
                </p>
            </div>

            <ProductsTable products={products} onUpdate={handleUpdate} />
        </div>
    );
}
