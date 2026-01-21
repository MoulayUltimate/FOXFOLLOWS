export function PaymentMethods({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
            {/* Nigie */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-[#635BFF] shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 60 25" className="h-4 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="white">nigie</text>
                </svg>
            </div>

            {/* AMEX */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-[#006FCF] shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 50 30" className="h-4 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.6 11.8h3.8l-2.3-5.6h-2l-2.3 5.6h3.8l.3-.9h2.2l.3.9zm-1.1-2.8h-1.6l.8-2.2.8 2.2zm12.6 2.8h2.3l-1.8-5.6h-3.4l-1.8 5.6h2.3l.3-.9h2.2l.3.9zm-1.1-2.8h-1.6l.8-2.2.8 2.2zm4.3 2.8h6.2v-1.4h-4v-.8h3.6v-1.4h-3.6v-.7h3.9V4.8h-6.1v7zm12.3 0l2.6-3.2 2.5 3.2h2.8l-3.8-4.6 3.6-4.2h-2.7l-2.4 2.9-2.3-2.9h-2.7l3.5 4.2-3.8 4.6h2.7z" />
                </svg>
            </div>

            {/* Mastercard */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 24 15" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7.5" r="7" fill="#EB001B" />
                    <circle cx="17" cy="7.5" r="7" fill="#F79E1B" />
                    <path d="M12 2.5c1.7 1.3 2.8 3.3 2.8 5.5s-1.1 4.2-2.8 5.5c-1.7-1.3-2.8-3.3-2.8-5.5s1.1-4.2 2.8-5.5z" fill="#FF5F00" />
                </svg>
            </div>

            {/* PayPal */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 24 24" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.64h6.265c2.078 0 3.753.484 4.913 1.419 1.09.879 1.623 2.157 1.536 3.804-.166 3.144-2.24 5.2-5.41 5.373l-.282.012h-.768a.77.77 0 0 0-.757.64l-.014.082-.702 4.447-.01.054a.64.64 0 0 1-.633.546l-2.763-.12z" />
                    <path fill="#0070E0" d="M19.085 7.707c-.166 3.144-2.24 5.2-5.41 5.373l-.282.012h-.768a.77.77 0 0 0-.757.64l-.014.082-.702 4.447-.01.054a.64.64 0 0 1-.633.546H8.82l-.01.11-.385 2.44a.533.533 0 0 0 .527.619h3.7a.64.64 0 0 0 .632-.546l.026-.134.503-3.188.032-.176a.64.64 0 0 1 .632-.546h.399c2.58 0 4.6-1.048 5.19-4.08.246-1.27.119-2.33-.533-3.072a2.545 2.545 0 0 0-.728-.581z" />
                </svg>
            </div>

            {/* VISA */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 48 16" className="h-3 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#1434CB" d="M19.5 1l-3.6 14h-4.5L15 1h4.5zm16.6 9l2.4-6.5.8 6.5h-3.2zm5 5h4.2l-3.7-14h-3.9c-.9 0-1.6.5-2 1.3l-6.9 12.7h4.8l1-2.6h5.9l.6 2.6zM29 9.5c0-3.6-5-3.8-5-5.4 0-.5.5-1 1.5-1.1.5 0 1.9-.1 3.5.7l.6-2.9C28.5.4 27.2 0 25.5 0c-4.5 0-7.7 2.4-7.7 5.8 0 2.5 2.2 3.9 3.9 4.8 1.8.8 2.4 1.4 2.4 2.2 0 1.2-1.4 1.7-2.8 1.7-2.4 0-3.7-.6-4.8-1.1l-.8 3.9c1.1.5 3.1 1 5.2 1 4.8 0 8-2.4 8-6zM11.4 1L4 15h-4L.5 3.6c0-.6-.2-1-.8-1.4C-1 1.6.3 1.3 1.5 1l.3 1.3 3.8 10.2L11.4 1h4.2" />
                </svg>
            </div>

            {/* Apple Pay */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 50 21" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path fill="black" d="M9.6 5.4c-.6.7-1.5 1.3-2.5 1.2-.1-1 .4-2 .9-2.7.6-.7 1.6-1.2 2.4-1.3.1 1.1-.3 2.1-.8 2.8zm.8 1.4c-1.4-.1-2.6.8-3.2.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.8 2.1 1.1 0 1.5-.7 2.8-.7 1.4 0 1.7.7 2.8.7 1.2 0 2-1 2.7-2.1.9-1.2 1.2-2.3 1.2-2.4-.1 0-2.4-.9-2.4-3.6 0-2.3 1.9-3.3 2-3.4-1.1-1.6-2.8-1.8-3.5-1.8v.4zm9.6-3.3v15.7h2.4v-5.4h3.4c3.1 0 5.3-2.1 5.3-5.2s-2.1-5.1-5.2-5.1h-5.9zm2.4 2h2.8c2.1 0 3.3 1.1 3.3 3.1 0 2-1.2 3.1-3.3 3.1h-2.8V5.5zm13.1 14c1.5 0 2.9-.8 3.6-2h.1v1.8h2.2V10.3c0-2.2-1.8-3.7-4.5-3.7-2.5 0-4.4 1.5-4.5 3.5h2.2c.2-1 1.1-1.6 2.2-1.6 1.4 0 2.2.7 2.2 1.9v.8l-2.9.2c-2.7.2-4.2 1.3-4.2 3.2 0 2 1.6 3.3 3.6 3.3zm.6-1.8c-1.2 0-2-.6-2-1.5 0-1 .7-1.5 2.1-1.6l2.6-.2v.9c0 1.4-1.2 2.4-2.7 2.4zm7 6.3c2.3 0 3.4-.9 4.4-3.6l4.2-11.7h-2.5l-2.8 8.9h-.1l-2.8-8.9h-2.5l4 11.3-.2.7c-.4 1.1-1 1.5-2 1.5-.2 0-.5 0-.6-.1v1.8c.2.1.7.1.9.1z" />
                </svg>
            </div>

            {/* Klarna */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-[#FFB3C7] shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 100 25" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.6 22.4h-4.2V2.6h4.2v19.8zm11.4 0h-4.6l-6.8-9.2v9.2h-4.2V2.6h4.2v9.1l6.6-9.1h5l-7.3 9.4 7.1 10.4zm5.8-19.8h4.2v19.8h-4.2V2.6zm14.1 12.6c0 2.6-2.1 4.5-4.9 4.5-1.5 0-2.8-.6-3.6-1.6v1.3h-4.1V9.7h4.1v1.4c.8-1 2.1-1.6 3.6-1.6 2.8 0 4.9 1.9 4.9 4.5v1.2zm-4.3 0c0-1.1-.9-2-2.1-2-1.2 0-2.1.9-2.1 2v.1c0 1.1.9 2 2.1 2 1.2 0 2.1-.9 2.1-2v-.1zm10.5-4.8v2.3c.3-.1.6-.1.9-.1 2.1 0 3.3 1.1 3.3 3.3v6.6h-4.2v-6.1c0-.7-.3-1.1-1-1.1-.7 0-1.2.4-1.2 1.1v6.1h-4.2V9.7h4.2v1.3c.6-.9 1.6-1.4 2.8-1.4.5 0 .9.1 1.4.2l-2 2.4zm14.1 4.8c0 2.6-2.1 4.5-4.9 4.5-1.5 0-2.8-.6-3.6-1.6v1.3h-4.1V9.7h4.1v1.4c.8-1 2.1-1.6 3.6-1.6 2.8 0 4.9 1.9 4.9 4.5v1.2zm-4.3 0c0-1.1-.9-2-2.1-2-1.2 0-2.1.9-2.1 2v.1c0 1.1.9 2 2.1 2 1.2 0 2.1-.9 2.1-2v-.1zm12.3 7.6c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5z" />
                </svg>
            </div>

            {/* Bitcoin */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-[#F7931A] shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 24 24" className="h-5 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.036-1.244 15.525.363 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546z" />
                    <path fill="#F7931A" d="M17.1 10.1c.2-1.3-.8-2-2.2-2.5l.4-1.8-1-.3-.4 1.7c-.3-.1-.5-.1-.8-.2l.4-1.7-1-.3-.4 1.8c-.2-.1-.4-.1-.6-.2l-1.4-.4-.3 1.1s.8.2.7.2c.4.1.5.4.5.6l-.5 2.1v.1l-.7 2.8c-.1.2-.2.4-.6.3 0 0-.7-.2-.7-.2l-.5 1.2 1.3.3.7.2-.5 1.8 1 .3.4-1.8c.3.1.5.1.8.2l-.4 1.8 1 .3.5-1.8c1.7.3 3 .2 3.5-1.3.4-1.2 0-1.9-.9-2.4.6-.1 1.1-.6 1.3-1.4zm-2.3 3.2c-.3 1.2-2.3.6-3 .4l.5-2.2c.7.2 2.8.5 2.5 1.8zm.3-3.2c-.3 1.1-1.9.5-2.5.4l.5-2c.6.1 2.4.4 2 1.6z" />
                </svg>
            </div>

            {/* Shop Pay */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-[#5A31F4] shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 90 40" className="h-5 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8 19.7c-2.8 0-4.6-1.6-4.6-4.1 0-2.4 1.8-4.1 4.6-4.1 2.8 0 4.6 1.6 4.6 4.1 0 2.4-1.8 4.1-4.6 4.1zm0-11.4C7.4 8.3 4 11.2 4 15.6c0 4.4 3.4 7.3 8.8 7.3 5.3 0 8.8-2.9 8.8-7.3 0-4.4-3.4-7.3-8.8-7.3zm18.3 11.4c-2.4 0-3.9-1.6-3.9-4.1 0-2.4 1.6-4.1 3.9-4.1 2.4 0 3.9 1.6 3.9 4.1 0 2.4-1.6 4.1-3.9 4.1zm0-11.4c-4.7 0-8 2.9-8 7.3 0 4.4 3.3 7.3 8 7.3 2.1 0 4-.6 5.3-1.7v5.1h4.1V8.6h-4.1v1.7c-1.3-1.1-3.2-1.7-5.3-1.7zm28.8 0c-4.7 0-8 2.9-8 7.3 0 4.4 3.3 7.3 8 7.3 2.1 0 4-.6 5.3-1.7v5.1h4.1V8.6h-4.1v1.7c-1.3-1.1-3.2-1.7-5.3-1.7zm0 11.4c-2.4 0-3.9-1.6-3.9-4.1 0-2.4 1.6-4.1 3.9-4.1 2.4 0 3.9 1.6 3.9 4.1 0 2.4-1.6 4.1-3.9 4.1zm19.9-11.4l-5.1 14.3h4.4l1.1-3.3h7.2l1.1 3.3h4.4l-5.1-14.3h-8zm2.2 8.3l2.2-6.4 2.2 6.4h-4.4z" />
                    <path d="M78.6 8.6l-2.9 8.5-2.9-8.5h-4.6l5.3 14.3-2.3 6.6h4.4l8-20.9h-5z" />
                </svg>
            </div>

            {/* Ethereum */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 24 24" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#627EEA" d="M12 1.5l-.1.4v14.2l.1.1 6.6-3.9L12 1.5z" />
                    <path fill="#3C3C3B" d="M12 1.5L5.4 12.3l6.6 3.9V1.5z" />
                    <path fill="#627EEA" d="M12 17.5l-.1.1v5l.1.3 6.6-9.3-6.6 3.9z" />
                    <path fill="#3C3C3B" d="M12 22.9v-5.4l-6.6-3.9 6.6 9.3z" />
                    <path fill="#8C8C8C" d="M12 16.2l6.6-3.9L12 9.1v7.1z" />
                    <path fill="#393939" d="M5.4 12.3l6.6 3.9V9.1l-6.6 3.2z" />
                </svg>
            </div>

            {/* Litecoin */}
            <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-100 shadow-sm transition-transform hover:scale-110 hover:shadow-md cursor-pointer">
                <svg viewBox="0 0 24 24" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" fill="#A6A9AA" />
                    <path fill="white" d="M12 5.5l-1.5 6.5-2 1 .5-2-1.5.5.5-2.5 1.5-.5 2-8.5h2l-1.5 6.5 1.5-.5-.5 2.5-1.5.5-.5 2h5v2H8l.5-2 1.5-.5L12 5.5z" />
                </svg>
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
        </div>
    );
}
