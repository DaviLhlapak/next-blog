import { useEffect, useState } from 'react';

import { Transition } from '@headlessui/react';

import { ToastNotification } from './toast';

export default function ToastChildComponent({
    notification,
}: {
    notification: ToastNotification;
}) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 5000);
    }, []);

    if (show === false) {
        return null;
    }

    return (
        <Transition
            show={show}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                className={`relative rounded shadow p-2 mb-4 text-sm font-bold ${notification.backgroundColor} ${notification.textColor}`}
            >
                {notification.text}
                <div className="absolute bottom-0 left-0 flex w-full h-1 opacity-50 bg-white animate-progress-bar" />
            </div>
        </Transition>
    );
}
