import { useState } from "react"

import { IconSearch } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

import { usePokemonSearch } from "./PokemonSearchProvider"


function PokemonSearchInput() {
  const { setSearch, inputRef } = usePokemonSearch()
  const [input, setInput] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        // search needs at least 3 characters
        if (input.length < 3) return

        setSearch(input)
        inputRef.current?.blur()
      }}
      className="sticky top-0 bg-background pb-2 pt-1 z-10"
    >
      <ButtonGroup className="w-full">
        <InputGroup className="border-input/30 h-8! text-muted-foreground">
          <InputGroupInput
            placeholder="Type to search..."
            className="text-sm text-popover-foreground"
            value={input}
            onInput={(e) => setInput(e.currentTarget.value)}
            ref={inputRef}
            autoComplete="off"
            aria-autocomplete="none"
          />
          <InputGroupAddon align="inline-start" className="text-muted-foreground">
            <IconSearch className="opacity-50" />
          </InputGroupAddon>
        </InputGroup>
        <Button aria-label="Search" type="submit">Search</Button>
      </ButtonGroup>
    </form>
  );
}

export { PokemonSearchInput }