export const handleWordsNum = () => {
  return [
    {
      label: '12',
      command: 128
    },
    {
      label: '15',
      command: 160
    },
    {
      label: '18',
      command: 192
    },
    {
      label: '21',
      command: 224
    },
    {
      label: '24',
      command: 256
    }
  ];
};
export const handleReduce = (arr: any, key: string = 'id') => {
  const obj: { [key: string]: boolean } = {};
  const arrResult = arr.reduce(
    (item: any[], next: { [x: string]: string | number }) => {
      if (!obj[next[key]]) {
        item.push(next);
        obj[next[key]] = true;
      }
      return item;
    },
    []
  );
  return arrResult;
};
