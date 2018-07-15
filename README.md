

# Простое управление сложными интерфейсами на React/Redux

kate-form - простой способ управления данными форм и их поведением с разделением логики и отображения для React/Redux.

- [Описание](#Описание)
- [Работа с библиотекой](#Работа-с-библиотекой)
- [Детали устройства библиотеки](#Детали-устройства-библиотеки)
- [Лицензия](#Лицензия)

Полный пример использования библиотеки можно найти в репозитории [kate-form-demo](https://github.com/romannep/kate-form-demo)


## Ограничения
Библиотека использует Proxy, поэтому будет работать только в современных браузерах.
Поддерживаемые версии можно глянуть тут [https://caniuse.com/#search=proxy](https://caniuse.com/#search=proxy)

Вариант реализации без Proxy возможен, но, учитывая область использования, особого смысла не исмеет.


## Описание

### Область использования

При создании сложных интерфейсов на React для:
 - админ. панелей,
 - систем управления задачами/проектами,
 - CRM систем,

 и аналогичных, необходимо разрабатывать множество форм.

Каждая форма в подобном интерфесе состоит из данных, элементов
 которые отображают и изменяют эти данные
 (input, select, checkbox и прочих),
 а также логики поведения самих элементов -
 изменении их атрибутов
 (видимость, доступность, визуальные характеристики и прочих)
 в зависимости от данных или действий пользователя.

Например:
 - по клику на кнопку "Отправить уведомление" появляется поле ввода "e-mail"
 - в зависимости от прав пользователя становится доступной кнопка "Редактировать"
 - при отличии значения поля "Пароль" от значения поля "Повторите пароль" выводится надпись "Пароли не совпадают"

 Для управления данными формы и их вводом есть, например, популярное решение - [redux-form](https://redux-form.com),
 которое хранит лишь данные формы.
 При его использовании, все характеристики и логика поведения элементов формы описывается либо в самих элементах либо внутри render.
 При таком подходе и отображение и логика идут вперемешку.
 В больших формах со сложной логикой это может приводить к неудобствам как разработки, так и поддержки.

 Данная бибилиотека создана для удобства описания поведения форм, с помощью разделения логики и отображения:

- помимо данных (значения) элемента формы, в `redux` `store` хранится и набор параметров, описывающих его визуальные характеристики,
- за отображение элемента формы отвечает отдельный компонент,
- предоставляется простой способ манипулирования как данными, так и характеристиками элементов.

### Пример использования

Рассмотрим два примера, предложенных выше:
- по клику на кнопку "Отправить уведомление" появляется поле ввода "e-mail" или скрывается, если оно уже отображено
- при отличии значения поля "Пароль" от значения поля "Повторите пароль" выводится надпись "Пароли не совпадают"

Элементы формы определеяются простым массивом, где мы указыаем их тип и связываем
с нужными обработчиками событий:

````
const elements = [
  {
    type: Elements.BUTTON,
    title: 'Send notification',
    onClick: this.showEMail,
  },
  {
    id: 'email',
    type: Elements.INPUT,
    placeholder: 'e-mail',
    hidden: true,
  },
  {
    id: 'password',
    type: Elements.INPUT,
    placeholder: 'Password',
    inputType: 'password',
    onChange: this.checkPasswords,
  },
  {
    id: 'password2',
    type: Elements.INPUT,
    placeholder: 'Retype password',
    inputType: 'password',
    onChange: this.checkPasswords,
  },
  {
    id: 'passwordsMatchText',
    type: Elements.LABEL,
    title: 'Passwords match',
  },
];

````

А обработчики определяем как методы компонента и используем в них поле `content`
для доступа к свойствам элементов формы, используя заданные в списке
`id` элементов как имена полей.

````
showEMail = () => {
  this.content.email.hidden = !this.content.email.hidden;
}
checkPasswords = () => {
  if (this.content.password.value !== this.content.password2.value) {
    this.content.passwordsMatchText.title = 'Passwords do not match';
  } else {
    this.content.passwordsMatchText.title = 'Passwords match';
  }
}
````

Просто, быстро, удобно и читаемо!

При таком подходе возникает вопрос о расположении различных элементов
на странице. В примере выше - они описаны простым массивом, а значит будут выводится
единообразно, друг за другом, что, в некоторых случаях недостаточно.

Для решения этого вопроса можно сделать вспомогательные элементы, которые будут
регулировать расположение других элементов на станице.

Код обработчиков остается таким-же, т.к. `content` рекурсивно находит
нужные элементы по `id`.

````
const elements = [
  {
    type: Elements.GROUP,
    layout: 'horizontal',
    elements: [
      {
        type: Elements.BUTTON,
        title: 'Send notification',
        onClick: this.showEMail,
      },
      {
        id: 'email',
        type: Elements.INPUT,
        placeholder: 'e-mail',
        hidden: true,
      },
    ],
  },
  {
    type: Elements.GROUP,
    elements: [
      {
        id: 'password2_1',
        type: Elements.INPUT,
        placeholder: 'Password',
        inputType: 'password',
        onChange: this.checkPasswords,
      },
      {
        id: 'password2_2',
        type: Elements.INPUT,
        placeholder: 'Retype password',
        inputType: 'password',
        onChange: this.checkPasswords,
      },
      {
        id: 'passwordsMatchText',
        type: Elements.LABEL,
        title: 'Passwords match',
      },
    ],
  },
];
````

### Концепция

Принцип работы `kate-form` очень простой:
- есть набор `коннекторов` - компонентов элементов, которые используются в формах,
с уникальным именами для каждого
- в самой форме определяется набор элементов, с указанием имени нужного коннектора
в поле type
- Компонент `KateForm` выполняет рендер элементов, подставляя нужный компонент
 в соответствии с типом, передавая значение остальных полей как `props`.

Таким образом достигается разделение отображения и логики:
- за отображение отвечают коннекторы,
- за логику формы отвечают набор элементов и их взаимодействие в классе компонента формы.


## Работа с библиотекой

Полный пример использования библиотеки можно найти в репозитории https://github.com/romannep/kate-form-demo

### Установка

````
npm install kate-form --save
````

### Подключение приложения

Для работы `kate-form` требуется `redux`.

Для хранения состояния необходимо подключить `reducer` из `kate-form`
в корневом `reducer`-e:

````
import { reducer } from 'kate-form';

const rootReducer = combineReducers({
  ...
  'kate-form': reducer,
  ...
});
````

Набор `коннекторов` передается через `KateFormProvider` в корневом для использующих
их форм компоненте.

````
import { KateFormProvider } from 'kate-form';

  ...
    <KateFormProvider connectors={connectors} [logRerender]>
      <App />
    </KateFormProvider>
  ...
````

Без передачи `коннекторов` `kate-form` будет использовать свой минимальный набор
встроенных.

Для отладки производительности можно указать опциональный параметр `logRerender`.
При этом в `console` будут выводится сообщения о рендере каждого элемента.

### Подключение компонента формы

Компонент формы необходимо подключить к `kate-form`, используя `HOC` функцию
`withKateForm(FormComponent, formPath, subElementsPath= 'elements', kateFormPath = 'kate-form')`, где
- `FormComponent` - подключаемый компонент
- `formPath` - путь к данным формы в `redux` `store` относительно всех данных `kate-form`
- `subElementsPath` - имя поля вложенных элементов в групповых коннекторах.
Необязательный параметр, по умолчанию `'elements'`.
- `kateFormPath` - путь к данным `kate-form` в `redux` `store`.
Необязательный параметр, по умолчанию `'kate-form'`

````
import { withKateForm } from 'kate-form';

const kateFormPath = 'formLayout';

class FormLayout extends Component {

  ...

}

export default withKateForm(FormLayout, kateFormPath);
````

Фукнция `withKateForm` передает в `props` следующие параметры:
- `kateFormInit(formElements)` - метод первоначальной установки элементов формы
- `kateFormContent` - объект `content` для работы с элементами формы
- `setData(path, value)` - метод прямого изменения данных формы,
где `path` - строка - путь к данным - индексы массива, имена полей объектов через `.`
- `data` - данные формы
- `setValues(obj)`- метод, для каждого `{ key: data }` в переданом в параметре объекта
ищет элемент с `id` == `key` и устанавливает поле `value` равному `data`
- `getValues()` - метод, который переберает все элементы формы имеющие поле `value`
и возвращает объект где ключами будут `id` элементов, а значениями - значения полей `value`


При первоначальном определении данных формы их необходимо установить в `redux store`.
Для этого используется метод `kateFormInit`.

Для удобства работы с данными формы объект `kateFormContent` можно сохранить в
свойство класса

Для вывода формы в `render` необходимо использовать компонент `KateForm` с параметром
`path` - пути к данным формы относительно всех данных `kate-form`

```
import { ..., KateForm } from 'kate-form';

class FormLayout extends Component {
  constructor(props) {
    super(props);
    const { kateFormInit, kateFormContent } = this.props;

    const elements = [
        {
          type: 'button',
          title: 'Show/hide email',
          onClick: this.showEMail,
        },
        {
          id: 'email',
          type: 'input',
          placeholder: 'e-mail',
          hidden: true,
        },

      ...
    ];

    kateFormInit(elements);
    this.content = kateFormContent;
  }

  showEMail = () => {
    this.content.email.hidden = !this.content.email.hidden;
  }

  ...

  render() {
    return (
      <KateForm path={kateFormPath} />
    );
  }
}

```
### Жизненный цикл

Работать с объектом `content` для доступа к элементам формы
прямо в конструкторе не получится: метод `kateFormInit` устанавливает
элементы формы условно в следующем цикле событий javascript (см детали реализации `redux`).
Отследить момент инициализации данных, а следовательно
момент начала возможной работы с `content` можно с помощью
метода `react` компонента `componentDidUpdate`.
В общем случае (при изменении `state` родительских компонентов)
этот метод может быть вызван не один раз, поэтому логично дополнить
компонент функцией `shouldComponentUpdate`.

````
shouldComponentUpdate(nextProps) {
  return this.props.data !== nextProps.data;
}
componentDidUpdate() {
  // do some after init stuff
}
````

### Коннекторы

Коннекторы это набор компонентов, которые представляют собой элементы
формы, которые используются для рендера.

````
const label = ({ title, ...props }) => (
  <span {...props}>{title}</span>
);

const connectors = {
  ...

  'label': label,
}
````

В форме мы можем использовать данный коннектор следующим образом:

````
constructor(props) {
  ...

  const elements = [
    ...

    {
      type: 'label',
      title: 'Some label',
      style: { color: '#FF0000'}
    }
  ];

  ...
}

````

`kate-form` выполняет рендер коннектора по его имени, указанном в поле `type`,
передавая остальные поля как `props`.
Данный пример будет эквивалентен

````
<span style={{ color: '#FF0000' }} >Some label</span>
````

В `props` коннектора, помимо данных элемента передаются еще два параметра:
- `setData(subPath, value)` - метод изменения данных, где `subPath` - путь к данным
относительно самого элемента и `value` - значение, которое нужно установить.
- `path` - полный путь к самому элементу.

Коннектор для поля ввода в минимальном ввиде может выглядеть так:

````
const input = ({ setData, value, ...props }) => {
  const change = (e) => {
    setData('value', e.target.value);
  };
  return (
    <input onChange={change} value={value || ''} {...props} />
  );
};
````

Коннектор для вывода группы элементов, где элементы группы находятся в поле `elements`
````
const elements = [
  ...
  {
    type: 'group',
    elements: [
      {
        type: 'button',
        title: 'Send notification',
        onClick: this.showEMail,
      },
      {
        id: 'email',
        type: 'input',
        placeholder: 'e-mail',
        hidden: true,
      },

    ]
  }
  ...
]
````

в минимальном ввиде может выглядеть так

````
const group = ({ path, elements, ...props }) => {
  return (
    <div>
      {
        elements.map((item, index) => (
          <div key={index}>
            <KateForm path={`${path}.elements.${index}`} />
          </div>
        ))
      }
    </div>
  );
};

````

Для исключения использования строк в качестве идентификаторов коннекторов
логично использовать константы. Во встроенных коннекторах `kate-form` для
этой цели используется набор текстовых констант `Elements`.

````
import { ..., Elements } from 'kate-form';


const elements = [
  {
    type: Elements.GROUP,
    layout: 'horizontal',
    elements: [
      {
        type: Elements.BUTTON,
        title: 'Send notification',
        onClick: this.showEMail,
      },
      {
        id: 'email',
        type: Elements.INPUT,
        placeholder: 'e-mail',
        hidden: true,
      },
    ],
  },

````

## Детали устройства библиотеки

### Компонент формы

Данные каждой формы подключаются в `redux` по определенному пути относительно
всех данных `kate-form`, чтобы можно было использовать несколько различных форм.

Для доступа к данным формы и методу их изменения компонент формы подключается к
`redux` следующим образом

````
import { getSetData, ... } from 'kate-form';

const kateFormPath = 'formLayout';

class FormLayout extends Component {
  ...

}

const mapStateToProps = (state) => {
  return {
    ...

    data: state['kate-form'][kateFormPath],
  };
};

export default connect(mapStateToProps, {
  ...

  setData: getSetData(kateFormPath),
})(FormLayout);

````
При таком подключении в `props` в поле `data` у нас актуальное состояние данных формы,
а в поле `setData` - метод изменения данных.

В чистом виде, метод для изменения данных принимает путь к данным
и значние для установки.
Путь - `path` - строка, с именами полей объекта или индексами массива через `.`.

Для примера в описании, установка в объекте с id == `email` поля hidden равным `false`
вызов этого метода будет иметь вид:

````
setData('0.elements.1.hidden', false)
````

Структура элементов может быть сложной, со множеством уровней вложенности,
поэтому для удобства `kate-form` предоставляет объект `content`,
где можно удобно обратитья к нужному элементу по его `id`:

````
content.email.hidden = false
````

### Данные формы и логика

При первоначальном определении данных формы их необходимо установить в `redux store`,
т.к. `kate-form` для рендера берет данные от туда. Для этого используется метод
`setData`;

Если компонент предоставляет собой только форму, это можно сделать в
методах `constructor` или `componentWillMount`.


````
constructor(props) {
  super(props);
  const { setData } = this.props;

  const elements = [
    ...
  ];

  setData('',elements);
}
````

Для получения объекта `content` для удобной работы с элементами формы используется
функция `getContent`. Фнукция создает `Proxy` объекты для доступа к данным,
поэтому ей необходимо передать два метода - получения и установки данных.

````
import { ..., createContent } from 'kate-form';

...

class FormLayout extends Component {

  constructor(props) {
    super(props);
    const { setData } = this.props;

    ...

    this.content = createContent(this.getData, setData);
  }
  getData = () => this.props.data;

  ...

}
````

Функция `getContent` подразумевает, что в элементах - группах их вложенные элементы
хранятся в массиве в поле `elements`. Если вложенные элементы хранятся в поле с
другим названием, его необходимо передать третьим параметром.

````
this.content = createContent(this.getData, setData, 'subElements');
````


Для обработки значений формы можно использовать объект-массив `data`, а также
функцию `getValues`, которая переберет все элементы формы имеющие поле `value`
и вернет объект где ключем будет `id` элемента, а значением - значение его поля `value`

````
import { ..., getValues } from 'kate-form';

...

class FormLayout extends Component {
  ...

  logValues = () => {
    console.log(getValues(this.props.data));
  }

}
````

Функция `getValues` подразумевает, что в элементах - группах их вложенные элементы
хранятся в массиве в поле `elements`. Если вложенные элементы хранятся в поле с
другим названием, его необходимо передать вторым параметром.

````
getValues(this.props.data, 'subElements')
````

### Рендер формы

Для рендера формы используется компонент `KateForm`, которому в качестве параметра
передается путь к `redux store` относительно данных `kate-form` по которому находятся данные формы.

````
import { ..., KateForm } from 'kate-form';

const kateFormPath = 'formLayout';

...

class FormLayout extends Component {

  ...

  render() {
    return (
      <KateForm path={kateFormPath} />
    );
  }

}

````

Компонент `KateForm` работает следующим образом:
- если по переданному `path` находится массив, вызывается рендер `KateForm`
для каждого элемента массива с добавлением в `path` его индекса
- если по переданному `path` находится объект, вызывается рендер коннектора
согласно значению поля `type`.

## Лицензия

[MIT](https://github.com/romannep/kate-form/blob/master/license.md)
