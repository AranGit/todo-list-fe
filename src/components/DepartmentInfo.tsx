/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Department } from '../utils/utils';
import axios from 'axios';

const fetchData = async ({ setDepartments }: { setDepartments: any }) => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    const data = await response.data;
    const users: Department.User[] = data.users.map((item: any) => Department.mappedUserData(item));
    const departments: string[] = Department.getAllDepartmentsFromUsers(users);
    return setDepartments(Department.mapUsersToDepartmentDatas({ allDepartments: departments, users: users }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function DepartmentInfo() {
  const [departments, setDepartments] = useState<Department.DepartmentData[]>([])

  useEffect(() => {
    fetchData({ setDepartments });
  }, [])


  console.log("departments:" + Object.keys(departments));
  return (
    <div>
      {
        <ul>
          {
            departments.map((department: Department.DepartmentData) =>
              <li>
                <div>
                  <b>{Object.keys(department)}</b>
                </div>
                <div>
                  male: {department[Object.keys(department)[0]].male}
                </div>
                <div>
                  female: {department[Object.keys(department)[0]].female}
                </div>
                <div>
                  ageRange: {department[Object.keys(department)[0]].ageRange}
                </div>
                <div>
                  hair:
                  <ul>
                    <li>
                      Black: {department[Object.keys(department)[0]].hair.Black}
                    </li>
                    <li>
                      Blond: {department[Object.keys(department)[0]].hair.Blond}
                    </li>
                    <li>
                      Brown: {department[Object.keys(department)[0]].hair.Brown}
                    </li>
                    <li>
                      Chestnut: {department[Object.keys(department)[0]].hair.Chestnut}
                    </li>
                  </ul>
                </div>
                <div>
                  Address User:
                  <ul>
                    {
                      department[Object.keys(department)[0]].addressUser.map((address: Department.AddressUser) =>
                        <li>
                          {Object.keys(address)}: {address[Object.keys(address)[0]]}
                        </li>
                      )
                    }
                  </ul>
                </div>
              </li>
            )
          }
        </ul>
      }
    </div>
  )
}

export default DepartmentInfo
