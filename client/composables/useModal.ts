export const useModal = () => {
  const { $event } = useNuxtApp();

  const showAlertModal = (msg: string, func?: () => void) => {
    $event('onAlertModal', {
      contentVal: msg,
      callbackFunc: func,
    });
  };

  const showConfirmModal = (msg: string, func?: () => void) => {
    $event('onConfirmModal', {
      contentVal: msg,
      cancelVal: '취소',
      confirmVal: '확인',
      callbackFunc: func,
    });
  };

  return {
    showAlertModal,
    showConfirmModal,
  };
};
