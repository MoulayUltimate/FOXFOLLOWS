"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Edit2,
    Save,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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

interface ProductsTableProps {
    products: Product[];
    onUpdate: (id: string, updates: Partial<Product>) => Promise<void>;
}

export function ProductsTable({ products, onUpdate }: ProductsTableProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editPrice, setEditPrice] = useState<string>("");

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setEditPrice(product.price.toString());
    };

    const handleSave = async (id: string) => {
        const newPrice = parseFloat(editPrice);
        if (isNaN(newPrice) || newPrice < 0) {
            toast.error("Invalid price");
            return;
        }

        await onUpdate(id, { price: newPrice });
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditPrice("");
    };

    const handleToggleActive = async (id: string, currentActive: number) => {
        await onUpdate(id, { active: currentActive === 1 ? 0 : 1 });
    };

    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Platform
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Service
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Quantity
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Active
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-4 py-4 whitespace-nowrap capitalize">
                                    <span className="font-medium">{product.platform}</span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-muted-foreground capitalize">
                                    {product.service}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    {product.name}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    {product.quantity.toLocaleString()}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap font-medium">
                                    {editingId === product.id ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">$</span>
                                            <Input
                                                type="number"
                                                value={editPrice}
                                                onChange={(e) => setEditPrice(e.target.value)}
                                                className="w-24 h-8"
                                                step="0.01"
                                                min="0"
                                            />
                                        </div>
                                    ) : (
                                        `$${product.price.toFixed(2)}`
                                    )}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <Switch
                                        checked={product.active === 1}
                                        onCheckedChange={() => handleToggleActive(product.id, product.active)}
                                    />
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-right">
                                    {editingId === product.id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => handleSave(product.id)}>
                                                <Save className="h-4 w-4 text-green-500" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={handleCancel}>
                                                <X className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                                            <Edit2 className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {products.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No products found
                </div>
            )}
        </div>
    );
}
