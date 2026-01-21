import Image from "next/image";

export function PaymentMethods({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative w-full max-w-[400px]">
                <Image
                    src="/payment-methods.png"
                    alt="Payment Methods"
                    width={800}
                    height={200}
                    className="h-auto w-full"
                    priority
                />
            </div>
        </div>
    );
}
