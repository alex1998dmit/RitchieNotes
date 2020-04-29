import { noteTreeConstants } from '../constants';
import noteTree from '../services/note.tree';

 const initialTree = {
  id: 0,
  title: 'Ввдение в ОС',
  children: [
      {
          id: 1,
          title: 'Ядро ОС',
          description: 'Краткое введение',
          children: [
              {
                  id: 2,
                  title: 'Состав ядра',
                  description: 'Как работает ядро',
                  children: [
                      {
                          id: 3,
                          title: 'Программный модуль',
                          description: 'Некоторый текст по программному модулю',
                          children: [],
                      },
                      {
                          id: 4,
                          title: 'Физический модуль',
                          description: 'Некоторое описание физического модуля',
                          children: [],
                      }
                  ]
              },
              {
                  id: 5,
                  title: 'Типы ядер',
                  description: 'Расскажите об основных типах ядра',
                  children: [
                      {
                          id: 14,
                          title: 'Моноядро',
                          description: 'Как работает ядро',
                          children: [],
                      },
                      {
                          id: 13,
                          title: 'Экзоядро',
                          description: 'Как работает ядро',
                          children: [],
                      },
                      {
                          id: 12,
                          title: 'Миниядро',
                          description: 'Как работает ядро',
                          children: [],
                      },
                  ],                  
              }
          ]
      },
      {
          id: 6,
          title: 'Виды ОС',
          description: 'Ыввфывфывфывфыв',
          children: [
              {
                  id: 7,
                  title: 'Linux',
                  description: 'Ыввфывфывфывфыв',
                  children: [
                      {
                          id: 7,
                          title: ' Gentoo',
                          description: 'Ыввфывфывфывфыв',
                          children: [],
                      },
                      {
                          id: 7,
                          title: 'Ubuntu',
                          description: 'Ыввфывфывфывфыв',
                          children: [],
                      },
                  ],
              },
              {
                  id: 8,
                  title: 'Windows',
                  description: 'dakjdklajlkjsakld',
                  children: [
                      {
                          id: 7,
                          title: 'Win10',
                          description: 'Ыввфывфывфывфыв',
                          children: [],
                      },
                      {
                          id: 7,
                          title: 'Win Xp',
                          description: 'Ыввфывфывфывфыв',
                          children: [],
                      },
                      {
                          id: 7,
                          title: 'Win 7',
                          description: 'Ыввфывфывфывфыв',
                          children: [],
                      },
                  ],
              },
          ],
      },
  ],
};

const initState = {
    isLoading: false,
    items: [],
}

export default (state = initState, action) => {
  switch(action.type) {
    case noteTreeConstants.UPDATE_NOTE_TREE:
      return action.newTree;
    case noteTreeConstants.GET_USER_ITEMS_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
    case noteTreeConstants.GET_USER_ITEMS_SUCCESS:
        return {
            ...state,
            items: action.payload,
        };
    case noteTreeConstants.GET_USER_ITEMS_FAILURE:
        return {
            ...state,
            err: action.payload
        };
    default:
      return state;
  };
};
