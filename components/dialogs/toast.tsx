import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import ToastChildComponent from './toast-child';

export interface ToastHandles {
    showToast: (
        text: string,
        backgroundColor: string,
        textColor: string,
    ) => void;
}

export interface ToastNotification {
    text: string;
    backgroundColor: string;
    textColor: string;
}

const ToastComponent = React.forwardRef<ToastHandles>((_props, ref) => {
    const [notifications, setNotifications] = useState<ToastNotification[]>([]);
    const timerRef = useRef<NodeJS.Timeout>();

    const showToast = useCallback(
        (
            toastText: string,
            toastBackgroundColor: string,
            toastTextColor: string,
        ) => {
            if (notifications.length < 6) {
                setNotifications(oldlist => [
                    ...oldlist,
                    {
                        text: toastText,
                        backgroundColor: toastBackgroundColor,
                        textColor: toastTextColor,
                    },
                ]);
            }
        },
        [notifications],
    );

    useImperativeHandle(ref, () => ({
        showToast,
    }));

    useEffect(() => {
        if (timerRef.current !== undefined) {
            return clearTimeout(timerRef.current);
        }

        return undefined;
    }, []);

    useEffect(() => {
        if (timerRef.current !== undefined) {
            clearTimeout(timerRef.current);
        }

        if (notifications.length > 0) {
            timerRef.current = setTimeout(() => {
                setNotifications([]);
            }, notifications.length * 5000);
        }
    }, [notifications]);

    return (
        <div className="z-50 fixed top-5 right-5 flex flex-col">
            {notifications.map((notification, index) => {
                const key = `${notification.text}-${index}`;

                return (
                    <ToastChildComponent
                        key={key}
                        notification={notification}
                    />
                );
            })}
        </div>
    );
});

ToastComponent.displayName = 'ToastComponent';

export default ToastComponent;
