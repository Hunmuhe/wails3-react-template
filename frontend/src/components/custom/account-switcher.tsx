
import * as React from "react"
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useUserStore } from '@/store/store.user'
import { userType } from '@/types/user'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps { }

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
    const userStore = useUserStore()
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [open, setOpen] = React.useState(false)
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
    const [selectedTeam, setSelectedTeam] = React.useState<userType>(
        userStore.currUser
    )
    console.log(userStore)
    return (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a team"
                        className={cn("w-[200px] justify-between", className)}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            {/* <AvatarImage
                                src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
                                alt={selectedTeam.label}
                                className="grayscale"
                            /> */}
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {selectedTeam.username}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandGroup key="账号" heading="账号">
                                {userStore.users.map((user) => (
                                    <CommandItem
                                        key={user.username}
                                        onSelect={() => {
                                            userStore.switchUser(user.username)
                                            setSelectedTeam(user)
                                            setOpen(false)
                                        }}
                                        className="text-sm"
                                    >
                                        <Avatar className="mr-2 h-5 w-5">
                                            {/* <AvatarImage
                                                    src={`https://avatar.vercel.sh/${team.value}.png`}
                                                    alt={team.label}
                                                    className="grayscale"
                                                /> */}
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        {user.username}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                selectedTeam.username === user.username
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false)
                                            setShowNewTeamDialog(true)
                                        }}
                                    >
                                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                                        添加账号
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>添加账号</DialogTitle>
                    <DialogDescription>
                        添加账号描述
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <div className="space-y-2">
                            <Label >账号</Label>
                            <Input placeholder="账号" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label >密码</Label>
                            <Input placeholder="密码" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
                        取消
                    </Button>
                    <Button type="submit" onClick={() => {
                        console.log(username, password);
                        const user: userType = {
                            username: username,
                            token: password,
                        }
                        userStore.newUser(user)
                        setShowNewTeamDialog(false)
                    }}>添加</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
