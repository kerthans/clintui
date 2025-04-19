"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import { Popover } from "@/components/ui/popover"
import { wait } from "@/resources/lib/utils"
import { IconCircleCheckFill, IconTrash } from "@intentui/icons"

export default function PopoverControlledDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState<"idle" | "loading" | "success">("idle")
  const triggerRef = React.useRef(null)

  const deleteAccount = async () => {
    setLoading("loading")
    await wait(3000)
    setLoading("success")

    await wait(2000)
    setLoading("idle")
    setIsOpen(false)
  }
  return (
    <>
      <Button ref={triggerRef} onPress={() => setIsOpen(true)} intent="danger">
        Delete Account
      </Button>
      <Popover.Content
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="sm:max-w-sm"
      >
        <Popover.Header>
          <Popover.Title>Confirm Deletion</Popover.Title>
          <Popover.Description>
            Are you sure you want to delete your account? This action cannot be undone.
          </Popover.Description>
        </Popover.Header>
        <Popover.Footer>
          <Button intent="outline" onPress={() => setIsOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button
            isDisabled={loading === "loading"}
            onPress={deleteAccount}
            intent={["loading", "idle"].includes(loading) ? "danger" : "primary"}
          >
            {loading === "loading" ? (
              <>
                <Loader variant="spin" />
                Deleting...
              </>
            ) : loading === "success" ? (
              <>
                <IconCircleCheckFill />
                Deleted
              </>
            ) : (
              <>
                <IconTrash />
                Delete
              </>
            )}
          </Button>
        </Popover.Footer>
      </Popover.Content>
    </>
  )
}
