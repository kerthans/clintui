"use client"

import { Choicebox } from "@/components/ui/choicebox"

export default function ChoiceboxNoGapDemo() {
  return (
    <Choicebox
      className="mx-auto max-w-sm"
      selectionMode="single"
      defaultSelectedKeys={["Standard"]}
      aria-label="Select prices"
      gap={0}
      columns={1}
      items={prices}
    >
      {(item) => <Choicebox.Item title={item.title} description={item.description} />}
    </Choicebox>
  )
}

const prices = [
  { id: 1, title: "Basic", description: "Essentials, get started" },
  { id: 2, title: "Standard", description: "More features, support" },
  { id: 3, title: "Premium", description: "Advanced, growing needs" },
]
