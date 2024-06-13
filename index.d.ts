/// <reference path="global.d.ts" />

export = YooWidget;
export as namespace YooWidget;

declare namespace YooWidget {
  /**
   * Описание https://yookassa.ru/developers/payment-acceptance/integration-scenarios/widget/reference#initialization-parameters
   */
  interface YooMoneyCheckoutWidgetConfig {
    /** Токен, который вы получили после создания платежа */
    confirmation_token: string;
    /** Ссылка на страницу завершения оплаты */
    return_url?: string;
    /** Настройка виджета */
    customization?: {
      /** Настройка способа отображения*/
      modal?: boolean,
      /** Выбор способа оплаты для отображения, не все могут быть выбраны вместе*/
      payment_methods?: ('bank_card' | 'yoo_money' | 'mir_pay' | 'sberbank' | 'tinkoff_bank' | 'sbp' | 'sber_loan')[],
      /** цвета в формате #FFFFFF (https://yookassa.ru/developers/payment-acceptance/integration-scenarios/widget/reference#customize-color) */
      colors?: {
        /** Цвет акцентных элементов: кнопка Заплатить, выбранные переключатели, опции и текстовые поля */
        control_primary?: string,
        /** Цвет текста в кнопке 'Заплатить' и содержимого акцентных переключателей и опций */
        control_primary_content?: string,
        /** Цвет неакцентных элементов интерфейса.*/
        control_secondary?: string
        /** Цвет платежной формы и ее элементов */
        background?: string,
        /** Цвет границ и разделителей */
        border?: string,
        /** Цвет всех текстов на платежной форме, кроме текстов в кнопке Заплатить и во всплывающих подсказках.*/
        text?: string
      }
    };
    /**
     * Обработка ошибок инициализации.
     * Вызывается, если неверна конфигурация. Если карта не прошла, то все ошибки внутри виджета, дефолтно он сам работает с ними.
     * */
    error_callback: (error: YooMoneyErrorCallbackResult) => void;
  }

  interface YooMoneyErrorCallbackResult {
    /**
     * все коды ответов: https://yookassa.ru/developers/payment-acceptance/integration-scenarios/widget/reference#errors
     * "internal_service_error" - токен протух или неверный,
     * "invalid_token" - токен невалиден,
     * "invalid_combination_of_payment_methods"
     */
    error: string;
  }

  /**
   * Описание https://yookassa.ru/developers/payment-acceptance/integration-scenarios/widget/reference#methods
   */
  type YooMoneyCheckoutWidget = {
    new(config: YooMoneyCheckoutWidgetConfig): YooMoneyCheckoutWidget;
    /**
     * Описание: https://yookassa.ru/developers/payment-acceptance/integration-scenarios/widget/reference#widget-events
     * @param eventName 'complete' - после оплаты
     * 'modal_close' - после закрытия модального окна платежной формы если customization.modal==true
     * 'success' - Приходит, только если не подписались на complete, и пользователь успешно ввел данные и подтвердил платеж
     * 'fail' - если вы отключили обработку неуспешных попыток в виджете: пользователь выбрал любой способ оплаты, но платеж не прошел; закончился срок действия токена.
     *
     * @param callback
     */
    on: (
      eventName: 'success' | 'fail' | 'complete' | 'modal_close',
      callback: (result: { status: string }) => void
    ) => void;
    /**
     * Отображение платежной формы
     * @param id должно быть пустым только если customization.modal!=true
     */
    render: (id?: string) => Promise<undefined>;
    /**
     * Удаление платежной формы
     */
    destroy: () => void;
  }
}
