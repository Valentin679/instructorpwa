
import {Button} from "antd";
import {useRouter} from "next/navigation";

export default function AuthorizeForm({setUserId,}) {

    const router = useRouter()

    function setCookie(name, value, options = {}) {

        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }


  return (
      <div>
          <Button type={'primary'} onClick={() => {
              setCookie('instr', 1, {secure: true, 'max-age': 3600});
              setUserId(1)
              router.push('/')
          }}>Войти как Инструктор</Button>
      </div>

  );
}
