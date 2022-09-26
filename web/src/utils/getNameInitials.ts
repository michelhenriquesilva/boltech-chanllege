export const getNameInitials = () => {
  
    let userStoraged = {first_name: 'Ativos Digital'}

    if(localStorage.getItem('@AtivosDigitalWeb:user')){
      userStoraged = JSON.parse(localStorage.getItem('@AtivosDigitalWeb:user') || '')
    }

    const fullName: any = userStoraged.first_name
    const [firstName, lastName] = fullName.split(' ');
    const firstInitial = firstName?.substring(0, 1).toUpperCase() || '';
    const lastInitial = lastName?.substring(0, 1).toUpperCase() || '';  
    return `${firstInitial}${lastInitial}`;
  };