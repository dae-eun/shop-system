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
      confirmVal: '확인',
      cancelVal: '취소',
      callbackFunc: func,
    });
  };

  return {
    showAlertModal,
    showConfirmModal,
  };
};
