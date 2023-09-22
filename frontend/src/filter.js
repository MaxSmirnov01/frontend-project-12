import leoProfanity from 'leo-profanity';

const filter = leoProfanity;
filter.add(filter.getDictionary('ru'));
filter.add(filter.getDictionary('en'));
const filterList = filter.list();

const filterProfanity = (str) => {
  const result = str
    .split(' ')
    .map((item) => {
      if (filterList.includes(item)) {
        return item
          .split('')
          .map(() => '*')
          .join('');
      }
      return item;
    })
    .join(' ');
  return result;
};

export default filterProfanity;
