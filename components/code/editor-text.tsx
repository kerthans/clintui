"use client"

import React, { useState } from "react"

import generated from "@/__registry__/generated"
import { CodeHighlighter } from "@/components/code/code-highlighter"
import { CopyButton } from "@/components/code/copy-button"
import { Tabs } from "@/components/ui/tabs"
import { copyToClipboard } from "@/resources/lib/copy"
import type { RegistryItem } from "@/resources/types"
import {
  IconBrackets2,
  IconBrandCss,
  IconBrandReactjs,
  IconBrandTypescript,
  IconFile,
} from "@intentui/icons"
import { Tab } from "react-aria-components"
import { twMerge } from "tailwind-merge"

interface Props {
  source: Record<string, string>
}

const registry = generated as Record<string, RegistryItem>

export function EditorText({ source }: Props) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const [rawSourceCode, setRawSourceCode] = useState<Record<string, string | null>>({})

  const handleCopy = (key: string, value: string | null) => {
    if (value) {
      copyToClipboard(value)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000) // Reset after 2 seconds
    }
  }

  React.useEffect(() => {
    const fetchRegistryData = async () => {
      const fetchedSourceCode: Record<string, string | null> = {}
      await Promise.all(
        Object.entries(source)
          .filter(([key]) => key !== "preview")

          .map(async ([key, path]) => {
            const registryKey = `${path}`
            const registryItem = registry[registryKey]

            if (registryItem) {
              try {
                const response = await fetch(`/registry/${registryKey}.json`)
                if (response.ok) {
                  const registryEntry = await response.json()
                  fetchedSourceCode[key] =
                    registryEntry.files?.[0]?.content || "No content available"
                } else {
                  console.error(`Failed to fetch source code for ${path}:`, response.status)
                  fetchedSourceCode[key] = "Error loading source code."
                }
              } catch (error) {
                console.error(`Error fetching source code for ${path}:`, error)
                fetchedSourceCode[key] = "Error loading source code."
              }
            } else {
              console.error(`Registry item for ${registryKey} not found.`)
              fetchedSourceCode[key] = "Registry item not found."
            }
          }),
      )
      setRawSourceCode(fetchedSourceCode)
    }

    fetchRegistryData()
  }, [source])

  return (
    <>
      {rawSourceCode && Object.keys(rawSourceCode).length > 0 ? (
        <Tabs className="relative gap-0">
          <div className="flex items-center justify-between overflow-hidden rounded-t-lg border-x border-y ">
            <Tabs.List className="gap-0 border-0">
              {Object.keys(rawSourceCode).map((key) => (
                <Tab
                  className={(values) =>
                    twMerge(
                      "flex cursor-pointer items-center gap-x-1.5 whitespace-nowrap p-3 font-mono text-muted-fg text-xs tracking-tight",
                      "**:data-[slot=icon]:-ml-0.5 border-transparent border-x outline-hidden first:border-l-0 **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0",
                      (values.isSelected || values.isFocused || values.isFocusVisible) &&
                        "border-input bg-secondary text-secondary-fg dark:bg-muted",
                      values.isHovered && "bg-secondary text-secondary-fg dark:bg-muted",
                    )
                  }
                  key={key}
                  id={key}
                >
                  {key.includes("css") ? (
                    <IconBrandCss className="text-blue-500" />
                  ) : key.includes(".tsx") ? (
                    <IconBrandReactjs className="text-cyan-500" />
                  ) : key.includes(".ts") ? (
                    <IconBrandTypescript className="text-sky-500" />
                  ) : key.includes(".json") ? (
                    <IconBrackets2 className="text-purple-400" />
                  ) : (
                    <IconFile />
                  )}
                  <span>{key}</span>
                </Tab>
              ))}
            </Tabs.List>
          </div>
          {Object.entries(rawSourceCode).map(([key, value]) => (
            <Tabs.Panel
              key={key}
              id={key}
              className="overflow-hidden rounded-b-lg border-x border-b bg-shiki-bg"
            >
              <CopyButton
                className="absolute top-0.5 right-1"
                alwaysVisible
                isCopied={copiedStates[key] || false}
                onPress={() => handleCopy(key, value)}
              />
              <CodeHighlighter
                plain
                removeLastLine
                className="overflow-auto p-4"
                code={value || "No source code available"}
              />
            </Tabs.Panel>
          ))}
        </Tabs>
      ) : (
        <div className="p-4 text-center">Loading source code...</div>
      )}
    </>
  )
}
