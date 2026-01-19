export function PaymentMethods({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Apple Pay */}
            <div className="flex h-8 w-12 items-center justify-center rounded bg-black">
                <svg viewBox="0 0 38 24" className="h-4 w-auto fill-white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <path d="M14.65 11.2c-.3-.02-.67-.2-.88-.46-.19-.22-.36-.58-.32-.92.34-.03.68.17.89.42.2.26.34.6.31.96zm2.2.42v5.49h.85v-1.88h1.18c1.08 0 1.84-.74 1.84-1.81 0-1.07-.74-1.81-1.81-1.81h-2.06zm.85.72h.98c.74 0 1.16.4 1.16 1.09 0 .69-.42 1.09-1.16 1.09h-.98v-2.18zm-3.15.3c-.45-.01-.83.26-1.05.26-.24 0-.59-.27-.98-.26a1.45 1.45 0 0 0-1.23.75c-.53.91-.14 2.26.37 3 .25.37.55.77.94.75.38-.01.52-.24.98-.24.45 0 .58.24.98.24.41-.01.67-.37.91-.73.29-.42.4-.82.41-.84-.01-.01-.79-.31-.8-.1.21-.01-.75.61-1.11.64-1.14-.35-.52-.9-.58-1.09-.59zm8.2.4c-.99 0-1.6.53-1.65 1.26h.78c.07-.36.37-.59.84-.59.5 0 .8.27.8.71v.31l-1.1.06c-.95.05-1.49.48-1.49 1.18 0 .72.55 1.21 1.33 1.21.53 0 1.03-.28 1.26-.73h.02v.66h.79v-2.76c0-.8-.62-1.32-1.59-1.32zm1.94.07l1.45 4.01s-.07.24-.07.25c-.13.41-.33.57-.71.57-.07 0-.21 0-.27-.02v.67c.06.01.27.02.34.02.83 0 1.22-.31 1.56-1.28l1.5-4.21h-.87l-1.01 3.26h-.02l-1.01-3.26h-.89zm-1.17 2.19v.32c0 .52-.45.92-1.02.92-.44 0-.73-.23-.73-.58 0-.34.28-.56.77-.59l.98-.07z" />
                    <path d="M36 12c0-6.63-5.37-12-12-12H12C5.37 0 0 5.37 0 12s5.37 12 12 12h12c6.63 0 12-5.37 12-12z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                </svg>
            </div>

            {/* Visa */}
            <div className="flex h-8 w-12 items-center justify-center rounded border bg-white">
                <svg viewBox="0 0 36 12" className="h-3 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#1434CB" d="M13.5 0L11.7 8.6h-2.7l1.8-8.6h2.7zm4.4 0l-1.7 8.6h-2.6l1.7-8.6h2.6zM7.8 0L5.3 6.3 4.4 1.4C4.3.6 3.6 0 2.8 0H.1v.3c.9.2 1.9.6 2.5 1 .3.2.4.4.5.8l2.7 9.8h2.8L11.3 0H7.8z" />
                    <path fill="#1434CB" d="M22.5 0h-4.1c-1.3 0-2.3.4-2.3 1.9 0 3.3 4.5 3.5 4.5 5.3 0 .5-.6.7-1.1.7-.8 0-1.5-.2-2.3-.6l-.3 1.4c.8.4 1.8.6 2.7.6 2.8 0 4.6-1.4 4.6-3.6 0-2.9-4.5-3.1-4.5-4.9 0-.4.5-.7 1.5-.7.6 0 1.1.1 1.6.3L22.5 0z" />
                </svg>
            </div>

            {/* Mastercard */}
            <div className="flex h-8 w-12 items-center justify-center rounded border bg-white">
                <svg viewBox="0 0 24 18" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FF5F00" d="M12.12 14.88c-1.8 0-3.41-.93-4.41-2.35a7.88 7.88 0 0 1 0-7.06c1-1.42 2.61-2.35 4.41-2.35s3.41.93 4.41 2.35a7.88 7.88 0 0 1 0 7.06c-1 1.42-2.61 2.35-4.41 2.35z" />
                    <path fill="#EB001B" d="M7.71 12.53A7.88 7.88 0 0 1 12.12 5.47 7.9 7.9 0 0 0 4.22 5.47a7.9 7.9 0 0 0 0 14.12 7.9 7.9 0 0 0 7.9-7.06z" />
                    <path fill="#F79E1B" d="M12.12 19.59a7.9 7.9 0 0 0 7.9-7.06 7.9 7.9 0 0 0-7.9-7.06 7.88 7.88 0 0 1 0 14.12z" />
                </svg>
            </div>

            {/* Amex */}
            <div className="flex h-8 w-12 items-center justify-center rounded border bg-[#006FCF]">
                <svg viewBox="0 0 24 24" className="h-3 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6 10.4l-1.4-3.3h-2.1l-1.4 3.3-1.4-3.3H6.2l2.5 5.7-2.5 5.7h2.1l1.4-3.3 1.4 3.3h2.1l-2.5-5.7 2.5-5.7h-2.1l-1.4 3.3zm-9.3 0L3.9 7.1H1.8l2.5 5.7-2.5 5.7h2.1l1.4-3.3 1.4 3.3h2.1L6.3 12.8 8.8 7.1H6.7L5.3 10.4zm14.3 0l-1.4-3.3h-2.1l-1.4 3.3-1.4-3.3h-2.1l2.5 5.7-2.5 5.7h2.1l1.4-3.3 1.4 3.3h2.1l-2.5-5.7 2.5-5.7h-2.1l-1.4 3.3z" />
                </svg>
            </div>

            {/* Diners Club */}
            <div className="flex h-8 w-12 items-center justify-center rounded border bg-white">
                <svg viewBox="0 0 24 16" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="7" fill="#0079BE" />
                    <path d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" fill="white" />
                    <path d="M12 5.5v5" stroke="white" strokeWidth="1.5" />
                </svg>
            </div>
        </div>
    );
}
