export function PaymentMethods({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Apple Pay */}
            <div className="flex h-8 w-12 items-center justify-center rounded bg-black">
                <svg viewBox="0 0 38 16" className="h-4 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.98 9.07h1.44v4.52h-1.44V9.07zm-2.73 3.3c0 .8.66 1.25 1.7 1.25.5 0 .9-.08 1.15-.17l.15 1.1c-.3.12-.82.23-1.45.23-1.8 0-2.96-1-2.96-2.67V9.07H.3v-1.1h1.55V5.62h1.4v2.35h1.6v1.1H1.85v2.8c0 .6.3.88.8.88.2 0 .4-.03.58-.08l.02.5zm8.9-3.3h1.4v4.52h-1.32l-.06-.6c-.36.47-.95.7-1.6.7-1.12 0-1.8-.8-1.8-1.85 0-1.1.75-1.87 2.02-1.87.5 0 .97.1 1.34.25V10c0-.8-.5-1.2-1.3-1.2-.5 0-1 .16-1.4.4l-.4-1c.5-.3 1.2-.47 1.95-.47 1.6 0 2.6.97 2.6 2.6v3.25zm-1.4 1.9c-.3-.13-.6-.2-1-.2-.6 0-1 .34-1 .85 0 .48.37.8 1 .8.6 0 1.05-.37 1.05-.9v-.55zm5.7-1.9l-1.9 5.8h-1.38l.68-1.9-2.4-3.9h1.52l1.53 2.8 1.4-2.8h1.55zM17.4 5.2c.6 0 1.05.3 1.3.8l-1.2.7c-.13-.3-.37-.46-.7-.46-.5 0-.8.4-.8.9s.3.9.8.9c.35 0 .6-.16.73-.46l1.2.7c-.25.5-.7.8-1.3.8-1.2 0-2.1-1-2.1-2.2 0-1.2.9-2.2 2.08-2.2zM22.7 7.7c0-.9.7-1.3 1.7-1.3.4 0 .7.07.95.16l.22-1.1c-.26-.1-.6-.16-1-.16-1.8 0-3 1-3 2.67v5.62h1.43V9.07h1.6v-1.1h-1.6v-.3c0-.6.3-.87.8-.87.2 0 .4.03.58.08l.02.5c-.17.1-.4.14-.6.14-.5 0-.8.2-.8.6v.5h1.7v1.1h-1.7v4.5h-1.4V9.08h-.3V7.98h.3V7.7zm11.2 1.37h1.4v4.52h-1.32l-.06-.6c-.36.47-.95.7-1.6.7-1.12 0-1.8-.8-1.8-1.85 0-1.1.75-1.87 2.02-1.87.5 0 .97.1 1.34.25V10c0-.8-.5-1.2-1.3-1.2-.5 0-1 .16-1.4.4l-.4-1c.5-.3 1.2-.47 1.95-.47 1.6 0 2.6.97 2.6 2.6v3.25zm-1.4 1.9c-.3-.13-.6-.2-1-.2-.6 0-1 .34-1 .85 0 .48.37.8 1 .8.6 0 1.05-.37 1.05-.9v-.55z" />
                    <path d="M28.4 6.7c-.3-.08-.6-.1-.83-.1-1.3 0-2.1 1-2.1 2.2 0 1.2.8 2.2 2.1 2.2.23 0 .53-.04.83-.12l.2 1.1c-.3.12-.7.2-1.1.2-1.9 0-3.3-1.4-3.3-3.35 0-1.9 1.4-3.4 3.3-3.4.4 0 .8.07 1.1.2l-.2 1.07z" />
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
                <svg viewBox="0 0 24 18" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="9" r="7" fill="#EB001B" />
                    <circle cx="17" cy="9" r="7" fill="#F79E1B" />
                    <path d="M12 14.5c-1.7 0-3.2-.8-4.2-2 .8-1.5 1.2-3.2 1.2-5s-.4-3.5-1.2-5c1-1.2 2.5-2 4.2-2 1.7 0 3.2.8 4.2 2-.8 1.5-1.2 3.2-1.2 5s.4 3.5 1.2 5c-1 1.2-2.5 2-4.2 2z" fill="#FF5F00" />
                </svg>
            </div>

            {/* Amex */}
            <div className="flex h-8 w-12 items-center justify-center rounded border bg-[#006FCF]">
                <svg viewBox="0 0 24 16" className="h-3 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4h1.8L5.6 8 4.3 4h1.8l1.3 4 1.3-4h1.8L7.8 12H5.5L4.2 8l-1.3 4H1L2.5 4zm8.8 0h4.5v1.3h-2.8v1.8h2.6v1.3h-2.6v2.3h2.8V12h-4.5V4zm5.5 0h2.2l1.2 2.5 1.2-2.5h2.2L20.8 8l2.8 4h-2.2L20.2 9.5 19 12h-2.2l2.8-4-2.8-4z" />
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
