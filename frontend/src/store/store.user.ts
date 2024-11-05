import { create } from 'zustand'
import { userType } from '@/types/user'
import { persist, createJSONStorage } from 'zustand/middleware';

interface userstore {
    currUser: userType
    users: userType[]
    switchUser: (username: string) => void
    newUser: (user: userType) => void
}
// 确保有一个默认用户
const defaultUser: userType = {
    username: "请选择账号",
    token: null,
};

export const useUserStore = create<userstore>()(
    persist(
        (set) => ({
            currUser: defaultUser, // 初始为默认用户
            users: [defaultUser], // 初始用户列表包含默认用户
            switchUser: (username: string) => set((state) => {
                const user = state.users.find(user => user.username === username);
                return { currUser: user || defaultUser }; // 返回新的状态对象，默认回退为 defaultUser
            }),
            newUser: (user: userType) => set((state) => {
                if (state.users.length === 1 && state.users[0].username === "请选择账号" && state.users[0].token === null) {
                    return { users: [user] }
                }
                const existingUsers = state.users.filter(u => u.username !== user.username);
                return { users: [...existingUsers, user] }; // 添加新用户，确保不重复
            }),
        }),
        {
            name: 'userstore', // 唯一名称
            storage: createJSONStorage(() => localStorage), // 使用 localStorage
        }
    )
);

// export const useUserStore = create<userstore>()((set) => ({
//     currUser: null,
//     users: [
//         {
//             username: "请选择账号",
//             token: null,
//         }
//     ],
//     switchUser: (username: string) => set((state) => {
//         console.log(username, state); // 输出调试信息
//         const user = state.users.find(user => user.username === username);
//         return { currUser: user || null }; // 返回新的状态对象
//     }),
//     newUser: (user: userType) => set((state) => {
        // if (state.users.length === 1 && state.users[0].username === "请选择账号" && state.users[0].token === null) {
        //     return { users: [user] }
        // }
//         return { users: [...state.users, user] }
//     }),
// }))
