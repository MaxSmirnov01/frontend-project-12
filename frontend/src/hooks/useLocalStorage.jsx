const useLocalStorage = (action) => {
  switch (action) {
    case 'getItem':
      return localStorage.getItem('user');
    case 'removeItem':
      return () => localStorage.removeItem('user');
    case 'setItem':
      return (user) => localStorage.setItem('user', JSON.stringify(user));
    default:
      throw new Error('Некорректное действие', action);
  }
};

export default useLocalStorage;
