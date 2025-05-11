"use client"

import { useState, useCallback, memo } from "react"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { useNotifications } from "@/lib/contexts/notification-context"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Memoized notification item to prevent unnecessary re-renders
const NotificationItem = memo(
  ({
    notification,
    onClick,
  }: {
    notification: any
    onClick: (id: string) => void
  }) => {
    const isUnread = !notification.read

    const getNotificationIcon = (type: string) => {
      switch (type) {
        case "application":
          return "🧾"
        case "interview":
          return "🗓️"
        case "resume":
          return "📄"
        case "job":
          return "💼"
        default:
          return "📣"
      }
    }

    const formatNotificationTime = (timestamp: string) => {
      try {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
      } catch (error) {
        return "recently"
      }
    }

    return (
      <DropdownMenuItem
        key={notification.id}
        className={`flex flex-col items-start p-3 cursor-pointer ${isUnread ? "bg-muted/50" : ""}`}
        onClick={() => onClick(notification.id!)}
      >
        <div className="flex w-full">
          <span className="mr-2 text-lg">{getNotificationIcon(notification.type)}</span>
          <div className="flex-1">
            <div className="font-medium">{notification.title}</div>
            <p className="text-sm text-muted-foreground line-clamp-2">{notification.description}</p>
            <div className="text-xs text-muted-foreground mt-1">{formatNotificationTime(notification.timestamp)}</div>
          </div>
        </div>
      </DropdownMenuItem>
    )
  },
)

NotificationItem.displayName = "NotificationItem"

// Memoized group component
const NotificationGroup = memo(
  ({
    type,
    notifications,
    onClick,
  }: {
    type: string
    notifications: any[]
    onClick: (id: string) => void
  }) => {
    const getNotificationTypeName = (type: string) => {
      switch (type) {
        case "application":
          return "Applications"
        case "interview":
          return "Interviews"
        case "resume":
          return "Resume Updates"
        case "job":
          return "Job Matches"
        default:
          return "System"
      }
    }

    const getNotificationIcon = (type: string) => {
      switch (type) {
        case "application":
          return "🧾"
        case "interview":
          return "🗓️"
        case "resume":
          return "📄"
        case "job":
          return "💼"
        default:
          return "📣"
      }
    }

    return (
      <div className="mb-2">
        <div className="px-2 py-1 text-sm font-medium flex items-center">
          <span className="mr-2">{getNotificationIcon(type)}</span>
          <span>{getNotificationTypeName(type)}</span>
          <Badge className="ml-2" variant="outline">
            {notifications.length}
          </Badge>
        </div>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} onClick={onClick} />
        ))}
      </div>
    )
  },
)

NotificationGroup.displayName = "NotificationGroup"

export function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    groupedNotifications,
    preferences,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    updatePreference,
  } = useNotifications()

  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "grouped">("all")

  const handleNotificationClick = useCallback(
    (id: string) => {
      markAsRead(id)
      setOpen(false)
    },
    [markAsRead],
  )

  const getNotificationTypeName = useCallback((type: string) => {
    switch (type) {
      case "application":
        return "Applications"
      case "interview":
        return "Interviews"
      case "resume":
        return "Resume Updates"
      case "job":
        return "Job Matches"
      default:
        return "System"
    }
  }, [])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          <div className="flex gap-2">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Settings className="h-4 w-4 mr-1" />
                <span className="text-xs">Preferences</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuLabel>Notification Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {preferences.map((pref) => (
                    <DropdownMenuItem key={pref.type} className="flex justify-between items-center">
                      <span>{getNotificationTypeName(pref.type)}</span>
                      <Switch
                        checked={pref.enabled}
                        onCheckedChange={(checked) => updatePreference(pref.type, checked)}
                      />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-7 text-xs">
              Mark all read
            </Button>
            <Button variant="ghost" size="sm" onClick={clearNotifications} className="h-7 text-xs">
              Clear all
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "grouped")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="grouped">Grouped</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No notifications</div>
            ) : (
              <DropdownMenuGroup>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={handleNotificationClick}
                  />
                ))}
              </DropdownMenuGroup>
            )}
          </TabsContent>

          <TabsContent value="grouped" className="max-h-[300px] overflow-y-auto">
            {Object.keys(groupedNotifications).length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No notifications</div>
            ) : (
              <DropdownMenuGroup>
                {Object.entries(groupedNotifications).map(([type, items]) => (
                  <NotificationGroup key={type} type={type} notifications={items} onClick={handleNotificationClick} />
                ))}
              </DropdownMenuGroup>
            )}
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
