import { FC } from 'react';

interface NotificationMessageProps {
  title: string,
  description?: string,
}

export const NotificationMessage: FC<NotificationMessageProps> = ({ title, description }) => {
  return <div>
    <p style={{ fontWeight: 'bold' }}>{title}</p>
    <p>{description}</p>
  </div>
}

export const getNotificationMessage = ({ title, description }: NotificationMessageProps) => {
  return <NotificationMessage title={title} description={description} />
}