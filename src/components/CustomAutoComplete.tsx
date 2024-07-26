import { ChangeEvent, KeyboardEvent, memo, useEffect, useRef, useState } from "react";
import { useThrottle } from "../hooks/useThrottle";
import { useClickOutside } from "../hooks/useClickOutside";

export const CustomAutoComplete = memo(({ items }: { items: string[] }) => {
  const [userInput, setUserInput] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectedRef = useRef<HTMLUListElement | null>(null);

  const scrollIntoItem = () => {
    const selected = selectedRef.current?.querySelector(".selected-item");
    selected?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useClickOutside({
    ref: inputRef,
    cb: () => setTimeout(() => setIsOpened(false), 100)
  });

  useEffect(() => {
    inputRef.current?.setAttribute("aria-expanded", isOpened.toString());
  }, [isOpened]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();

    switch (e.key) {
      case "Enter":
        setUserInput(filter[activeIndex]);
        setIsOpened(false);
        setFilter([]);
        setActiveIndex(0);
        break;
      case "ArrowUp":
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        setTimeout(scrollIntoItem, 100);
        break;
      case "ArrowDown":
        setActiveIndex((prev) => (prev < filter.length - 1 ? prev + 1 : prev));
        setTimeout(scrollIntoItem, 100);
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value.toLowerCase();
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(newInput)
    );
    setUserInput(newInput);
    setFilter(filtered);
    setActiveIndex(0);
    if (!isOpened) setIsOpened(true);
  };

  const handleItemClick = (item: string) => {
    setUserInput(item);
    setIsOpened(false);
    setFilter([]);
    setActiveIndex(0);
  };

  const handleFocus = () => {
    if (filter.length > 0) setIsOpened(true);
  };

  return (
    <div className="custom-autocomplete">
      <input
        type="text"
        value={userInput}
        ref={inputRef}
        className="field"
        placeholder="Search for an email"
        onFocus={handleFocus}
        onChange={useThrottle(handleChange, 100)}
        aria-haspopup="listbox"
        aria-expanded="false"
        onKeyDown={handleKeyDown}
        aria-controls="custom-autocomplete-list"
        aria-autocomplete="list"
      />
      {isOpened && userInput && (
        <ul id="custom-autocomplete-list" className="list" role="listbox" ref={selectedRef}>
          {filter.map((curr, index) => (
            <li
              key={curr}
              className={index === activeIndex ? "selected-item" : "default-item"}
              dangerouslySetInnerHTML={{
                __html: curr.toLowerCase().replace(userInput, `<span class="match">${userInput}</span>`)
              }}
              role="option"
              onClick={() => handleItemClick(curr)}
            />
          ))}
        </ul>
      )}
    </div>
  );
});
