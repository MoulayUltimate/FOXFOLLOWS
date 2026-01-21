export function PaymentMethods({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
            {/* Mastercard */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 24 15" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7.5" r="7" fill="#EB001B" />
                    <circle cx="17" cy="7.5" r="7" fill="#F79E1B" />
                    <path d="M12 2.5c1.7 1.3 2.8 3.3 2.8 5.5s-1.1 4.2-2.8 5.5c-1.7-1.3-2.8-3.3-2.8-5.5s1.1-4.2 2.8-5.5z" fill="#FF5F00" />
                </svg>
            </div>

            {/* Maestro */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 24 15" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7.5" r="7" fill="#EB001B" />
                    <circle cx="17" cy="7.5" r="7" fill="#00A1E0" />
                    <path d="M12 2.5c1.7 1.3 2.8 3.3 2.8 5.5s-1.1 4.2-2.8 5.5c-1.7-1.3-2.8-3.3-2.8-5.5s1.1-4.2 2.8-5.5z" fill="#7358C3" fillOpacity="0.6" />
                </svg>
            </div>

            {/* VISA */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 48 16" className="h-3 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#1434CB" d="M19.5 1l-3.6 14h-4.5L15 1h4.5zm16.6 9l2.4-6.5.8 6.5h-3.2zm5 5h4.2l-3.7-14h-3.9c-.9 0-1.6.5-2 1.3l-6.9 12.7h4.8l1-2.6h5.9l.6 2.6zM29 9.5c0-3.6-5-3.8-5-5.4 0-.5.5-1 1.5-1.1.5 0 1.9-.1 3.5.7l.6-2.9C28.5.4 27.2 0 25.5 0c-4.5 0-7.7 2.4-7.7 5.8 0 2.5 2.2 3.9 3.9 4.8 1.8.8 2.4 1.4 2.4 2.2 0 1.2-1.4 1.7-2.8 1.7-2.4 0-3.7-.6-4.8-1.1l-.8 3.9c1.1.5 3.1 1 5.2 1 4.8 0 8-2.4 8-6zM11.4 1L4 15h-4L.5 3.6c0-.6-.2-1-.8-1.4C-1 1.6.3 1.3 1.5 1l.3 1.3 3.8 10.2L11.4 1h4.2" />
                </svg>
            </div>

            {/* AMEX */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-[#006FCF] shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 50 30" className="h-4 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.6 11.8h3.8l-2.3-5.6h-2l-2.3 5.6h3.8l.3-.9h2.2l.3.9zm-1.1-2.8h-1.6l.8-2.2.8 2.2zm12.6 2.8h2.3l-1.8-5.6h-3.4l-1.8 5.6h2.3l.3-.9h2.2l.3.9zm-1.1-2.8h-1.6l.8-2.2.8 2.2zm4.3 2.8h6.2v-1.4h-4v-.8h3.6v-1.4h-3.6v-.7h3.9V4.8h-6.1v7zm12.3 0l2.6-3.2 2.5 3.2h2.8l-3.8-4.6 3.6-4.2h-2.7l-2.4 2.9-2.3-2.9h-2.7l3.5 4.2-3.8 4.6h2.7z" />
                </svg>
            </div>

            {/* PayPal */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 24 24" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.64h6.265c2.078 0 3.753.484 4.913 1.419 1.09.879 1.623 2.157 1.536 3.804-.166 3.144-2.24 5.2-5.41 5.373l-.282.012h-.768a.77.77 0 0 0-.757.64l-.014.082-.702 4.447-.01.054a.64.64 0 0 1-.633.546l-2.763-.12z" />
                    <path fill="#0070E0" d="M19.085 7.707c-.166 3.144-2.24 5.2-5.41 5.373l-.282.012h-.768a.77.77 0 0 0-.757.64l-.014.082-.702 4.447-.01.054a.64.64 0 0 1-.633.546H8.82l-.01.11-.385 2.44a.533.533 0 0 0 .527.619h3.7a.64.64 0 0 0 .632-.546l.026-.134.503-3.188.032-.176a.64.64 0 0 1 .632-.546h.399c2.58 0 4.6-1.048 5.19-4.08.246-1.27.119-2.33-.533-3.072a2.545 2.545 0 0 0-.728-.581z" />
                </svg>
            </div>

            {/* Klarna */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-[#FFB3C7] shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 100 25" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.6 22.4h-4.2V2.6h4.2v19.8zm11.4 0h-4.6l-6.8-9.2v9.2h-4.2V2.6h4.2v9.1l6.6-9.1h5l-7.3 9.4 7.1 10.4zm5.8-19.8h4.2v19.8h-4.2V2.6zm14.1 12.6c0 2.6-2.1 4.5-4.9 4.5-1.5 0-2.8-.6-3.6-1.6v1.3h-4.1V9.7h4.1v1.4c.8-1 2.1-1.6 3.6-1.6 2.8 0 4.9 1.9 4.9 4.5v1.2zm-4.3 0c0-1.1-.9-2-2.1-2-1.2 0-2.1.9-2.1 2v.1c0 1.1.9 2 2.1 2 1.2 0 2.1-.9 2.1-2v-.1zm10.5-4.8v2.3c.3-.1.6-.1.9-.1 2.1 0 3.3 1.1 3.3 3.3v6.6h-4.2v-6.1c0-.7-.3-1.1-1-1.1-.7 0-1.2.4-1.2 1.1v6.1h-4.2V9.7h4.2v1.3c.6-.9 1.6-1.4 2.8-1.4.5 0 .9.1 1.4.2l-2 2.4zm14.1 4.8c0 2.6-2.1 4.5-4.9 4.5-1.5 0-2.8-.6-3.6-1.6v1.3h-4.1V9.7h4.1v1.4c.8-1 2.1-1.6 3.6-1.6 2.8 0 4.9 1.9 4.9 4.5v1.2zm-4.3 0c0-1.1-.9-2-2.1-2-1.2 0-2.1.9-2.1 2v.1c0 1.1.9 2 2.1 2 1.2 0 2.1-.9 2.1-2v-.1zm12.3 7.6c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5z" />
                </svg>
            </div>

            {/* Bank Transfer */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 mb-[1px]" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="none" />
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM15 16H5V8h10v8zm-6-1h2v-2h2v-2h-2V9H9v2H7v2h2z" fill="#000" />
                    </svg>
                    <span className="text-[5px] font-bold leading-none text-center">BANK<br />TRANSFER</span>
                </div>
            </div>

            {/* Google Pay */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 50 21" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4285F4" d="M23.2 10.5v6h-1.9V3.6h5c1.2 0 2.3.4 3.1 1.2.9.8 1.4 1.8 1.4 3 0 1.2-.5 2.2-1.4 3-.9.8-2 1.2-3.2 1.2h-3zm0-5.4v3.9h3.1c.7 0 1.3-.2 1.8-.7.5-.5.7-1.1.7-1.8 0-.6-.2-1.2-.7-1.7-.5-.5-1.1-.7-1.8-.7h-3.1z" />
                    <path fill="#34A853" d="M33.6 6.6c1.4 0 2.5.4 3.3 1.1.8.8 1.2 1.8 1.2 3.1v6.2H36.4v-1.4h-.1c-.8 1.2-1.8 1.7-3.1 1.7-1.1 0-2.1-.3-2.8-1-.7-.7-1.1-1.5-1.1-2.5 0-1.1.4-1.9 1.2-2.5.8-.6 1.9-.9 3.2-.9 1.1 0 2 .2 2.7.6v-.5c0-.6-.3-1.2-.8-1.6-.5-.4-1.1-.7-1.8-.7-.9 0-1.7.4-2.2 1.2l-1.6-1c.8-1.2 2.1-1.8 3.6-1.8zm-2.4 7.5c0 .5.2.9.6 1.2.4.3.9.5 1.4.5.8 0 1.5-.3 2.1-.9.6-.6.9-1.3.9-2-.5-.5-1.3-.7-2.4-.7-.8 0-1.4.2-1.9.5-.5.4-.7.8-.7 1.4z" />
                    <path fill="#FBBC04" d="M46.2 6.9l-5.9 13.6h-1.9l2.2-4.8-3.9-8.8h2l2.8 6.7h.1l2.7-6.7h1.9z" />
                    <path fill="#4285F4" d="M15.1 9.2c0-.5 0-.9-.1-1.4H7.7v2.6h4.2c-.2.9-.7 1.7-1.5 2.2v1.9h2.4c1.4-1.3 2.3-3.2 2.3-5.3z" />
                    <path fill="#34A853" d="M7.7 16.4c2 0 3.7-.7 5-1.8l-2.4-1.9c-.7.5-1.5.7-2.5.7-1.9 0-3.6-1.3-4.2-3.1H.9v1.9c1.3 2.5 3.9 4.2 6.8 4.2z" />
                    <path fill="#FBBC04" d="M3.5 10.3c-.2-.5-.2-1.1-.2-1.8 0-.6.1-1.2.2-1.8V4.9H.9C.3 6.1 0 7.5 0 8.9c0 1.4.3 2.8.9 4l2.6-2.6z" />
                    <path fill="#EA4335" d="M7.7 4c1.1 0 2.1.4 2.8 1.1l2.1-2.1C11.4 1.8 9.7 1 7.7 1 4.8 1 2.2 2.7.9 5.2l2.6 2c.6-1.8 2.3-3.2 4.2-3.2z" />
                </svg>
            </div>

            {/* Apple Pay */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 50 21" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path fill="black" d="M9.6 5.4c-.6.7-1.5 1.3-2.5 1.2-.1-1 .4-2 .9-2.7.6-.7 1.6-1.2 2.4-1.3.1 1.1-.3 2.1-.8 2.8zm.8 1.4c-1.4-.1-2.6.8-3.2.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.8 2.1 1.1 0 1.5-.7 2.8-.7 1.4 0 1.7.7 2.8.7 1.2 0 2-1 2.7-2.1.9-1.2 1.2-2.3 1.2-2.4-.1 0-2.4-.9-2.4-3.6 0-2.3 1.9-3.3 2-3.4-1.1-1.6-2.8-1.8-3.5-1.8v.4zm9.6-3.3v15.7h2.4v-5.4h3.4c3.1 0 5.3-2.1 5.3-5.2s-2.1-5.1-5.2-5.1h-5.9zm2.4 2h2.8c2.1 0 3.3 1.1 3.3 3.1 0 2-1.2 3.1-3.3 3.1h-2.8V5.5zm13.1 14c1.5 0 2.9-.8 3.6-2h.1v1.8h2.2V10.3c0-2.2-1.8-3.7-4.5-3.7-2.5 0-4.4 1.5-4.5 3.5h2.2c.2-1 1.1-1.6 2.2-1.6 1.4 0 2.2.7 2.2 1.9v.8l-2.9.2c-2.7.2-4.2 1.3-4.2 3.2 0 2 1.6 3.3 3.6 3.3zm.6-1.8c-1.2 0-2-.6-2-1.5 0-1 .7-1.5 2.1-1.6l2.6-.2v.9c0 1.4-1.2 2.4-2.7 2.4zm7 6.3c2.3 0 3.4-.9 4.4-3.6l4.2-11.7h-2.5l-2.8 8.9h-.1l-2.8-8.9h-2.5l4 11.3-.2.7c-.4 1.1-1 1.5-2 1.5-.2 0-.5 0-.6-.1v1.8c.2.1.7.1.9.1z" />
                </svg>
            </div>

            {/* Alipay */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-[#00A1E9] shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                    <svg viewBox="0 0 1024 1024" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M860.2 363.8c-32.8 0-149.6 0-149.6 0-10.8-49.8-28.6-96.6-52-140.2 69.4-5.6 128.8-10.4 128.8-10.4 23.4-1.8 23.4-36.4 0-38.2l-180.2-14.4c0 0-13.6-67.6-14.6-72.2-5.4-25.2-41-25.2-46.4 0-1 4.6-14.6 72.2-14.6 72.2l-180.2 14.4c-23.4 1.8-23.4 36.4 0 38.2 0 0 59.4 4.8 128.8 10.4-25.6 48-46.2 100.2-58.8 155.6-70.8 11.2-142.2 22.6-142.2 22.6-23.4 3.8-23.4 39.6 0 43.4l43.2 6.8c18.2 2.8 35.8-9.4 39.6-27.6 0 0 2.2-10.8 6.6-32.2 35.2-5.6 72.2-11.4 110.8-17.2 11.6 98.4 51.6 220.4 121.2 328.6-90.2 64.6-193.4 96.6-302.4 96.6-26.6 0-26.6 41.4 0 41.4 126.6 0 245.8-37.4 348.6-112.8 54.4 39.8 115.8 70.8 181.8 90.8 13.8 4.2 26.6-8.2 22.4-22-1.4-4.6-4.2-8.8-8-11.8-61.2-18.6-118-47.2-168.8-84 81.6-93.6 133.4-213.6 148.6-341.2 0 0 116.8 0 137.4 0 23.4 0 23.4-38.2 0-38.2zM521.8 668.2C465.4 577.6 431.2 475.6 421 363.8c39.6-6.4 79.2-12.8 118.8-19.2 13.6 112.2 56.2 217.4 122.2 305.6-46.2 8-93.4 14-140.2 18z" />
                    </svg>
                    <span className="text-[5px] font-bold leading-none text-white mt-[1px]">ALIPAY</span>
                </div>
            </div>
        </div>
    );
}
