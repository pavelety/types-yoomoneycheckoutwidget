/// <reference path="global.d.ts" />

export = YooWidget;
export as namespace YooWidget;

declare namespace YooWidget {
  interface YooMoneyCheckoutWidgetConfig {
    confirmation_token: string;
    return_url?: string;
    customization?: {
      modal?: boolean,
      payment_methods?: ('bank_card' | 'yoo_money' | 'mir_pay' | 'sberbank' | 'tinkoff_bank' | 'sbp' | 'sber_loan')[],
      /** цвета в формате #FFFFFF */
      colors?: {
        control_primary?: string,
        control_primary_content?: string,
        control_secondary?: string
        background?: string,
        border?: string,
        text?: string,
      }
    };
    /**
     * используется только если неверный или протухший токен, если карта не прошла, то все ошибки внутри виджета,
     * он сам работает с ними
     * */
    error_callback?: (error: YooMoneyErrorCallbackResult) => void;
  }

  interface YooMoneyErrorCallbackResult {
    /**
     * "internal_service_error" - токен протух или неверный
     * "invalid_token" - токен невалиден
     */
    error: string;
  }

  type YooMoneyCheckoutWidget = {
    new(params: YooMoneyCheckoutWidgetConfig): YooMoneyCheckoutWidget;
    on: (eventName: string, callback: (result: { status: string }) => void) => void;
    render: (id: string) => void;
    destroy: () => void;
  }
}
