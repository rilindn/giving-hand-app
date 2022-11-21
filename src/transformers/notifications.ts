import { INotification } from 'interfaces/notification';
import moment from 'moment';

const transformNotificationsResponse = (notifications: INotification[]) => {
  return notifications.map((n) => {
    const sender = `${n.sender.firstName} ${n.sender.lastName}`;
    const date = moment(n.createdAt).fromNow();
    let description = '';

    if (n.product) {
      const productTitle = n.product.title;
      const productId = n.product._id;
      description = transformNotificationDescription({ type: n.type, productTitle, productId, sender });
    }
    return {
      _id: n._id,
      sender,
      description,
      date,
      seen: n.read
    };
  });
};

const transformNotificationDescription = ({ type, productTitle, productId, sender }: INotificationDescTransform) => {
  return (
    {
      product_requested: `<b>${sender}</b> sent you a request for <a href="/product/${productId}"><b>${productTitle}</b></a>`,
      product_request_accepted: `<b>${sender}</b> has accepted your request for <a href="/product/${productId}"><b>${productTitle}</b></a>`,
      product_request_rejected: `<b>${sender}</b> has rejected your request for <a href="/product/${productId}"><b>${productTitle}</b></a>`
    }[type] || 'New notification'
  );
};

interface INotificationDescTransform {
  type: string;
  productTitle: string;
  sender: string;
  productId: string;
}

export default transformNotificationsResponse;
