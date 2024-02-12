/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TodoData {
  type: string;
  name: string;
}

export const todoList: TodoData[] = [
  {
    type: 'Fruit',
    name: 'Apple',
  },
  {
    type: 'Vegetable',
    name: 'Broccoli',
  },
  {
    type: 'Vegetable',
    name: 'Mushroom',
  },
  {
    type: 'Fruit',
    name: 'Banana',
  },
  {
    type: 'Vegetable',
    name: 'Tomato',
  },
  {
    type: 'Fruit',
    name: 'Orange',
  },
  {
    type: 'Fruit',
    name: 'Mango',
  },
  {
    type: 'Fruit',
    name: 'Pineapple',
  },
  {
    type: 'Vegetable',
    name: 'Cucumber',
  },
  {
    type: 'Fruit',
    name: 'Watermelon',
  },
  {
    type: 'Vegetable',
    name: 'Carrot',
  },
];

export const getAllTypes = (items: TodoData[]) => {
  const allTypes: string[] = [];
  items.filter((item: TodoData) => {
    if (!allTypes.includes(item.type)) {
      allTypes.push(item.type);
    }
    false
  })
  return allTypes;
};


// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
export module Department {
  export interface User {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    hair: {
      color: string,
    },
    address: {
      postalCode: string,
    },
    company: {
      department: string
    },
  }

  export const mappedUserData = (item: any) => {
    return {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      age: item.age,
      gender: item.gender,
      hair: {
        color: item.hair.color,
      },
      address: {
        postalCode: item.address.postalCode,
      },
      company: {
        department: item.company.department
      },
    }
  }

  export const getAllDepartmentsFromUsers = (users: User[]) => {
    const departments: string[] = [];
    users.filter((item: User) => {
      if (!departments.includes(item.company.department)) {
        departments.push(item.company.department);
      }
      false
    })
    return departments;
  };

  export type AddressUser = {
    [key: string]: string;
  };
  export interface Hair {
    Black: number,
    Blond: number,
    Chestnut: number,
    Brown: number
  }
  export interface DepartmentInfo {
    male: number,
    female: number,
    ageRange: string,
    hair: Hair,
    addressUser: AddressUser[]
  }

  export type DepartmentData = {
    [key: string]: DepartmentInfo;
  };

  export const mapUsersToDepartmentDatas = ({ allDepartments, users }: { allDepartments: string[], users: User[] }) => {
    const datas = allDepartments.map((department: string) => {
      const usersFromDepartments = users.filter(user => user.company.department === department);
      const departmentData: DepartmentData = {
        [department]: {
          male: usersFromDepartments.filter(user => user.gender === "male").length,
          female: usersFromDepartments.filter(user => user.gender === "female").length,
          ageRange: Math.min(...usersFromDepartments.map(user => user.age)) + "-" + Math.max(...usersFromDepartments.map(user => user.age)),
          hair: {
            Black: usersFromDepartments.filter(user => user.hair.color === "Black").length,
            Blond: usersFromDepartments.filter(user => user.hair.color === "Blond").length,
            Chestnut: usersFromDepartments.filter(user => user.hair.color === "Chestnut").length,
            Brown: usersFromDepartments.filter(user => user.hair.color === "Brown").length
          },
          addressUser: usersFromDepartments.map(user => {
            const address: AddressUser = { [user.firstName + user.firstName]: user.address.postalCode };
            return address;
          })
        }
      }
      return departmentData;
    })
    return datas;
  }

  export const DepaData: DepartmentData = {
    "HR": {
      male: 0,
      female: 0,
      ageRange: "",
      hair: {
        Black: 0,
        Blond: 0,
        Chestnut: 0,
        Brown: 0
      },
      addressUser: [{
        "AAA": ""
      }]
    }
  }
}
