"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BuilderBlock } from "@/types/builder";

type Props = {
  block: BuilderBlock | null;
  canEdit: boolean;
  onChange: (updater: Partial<BuilderBlock["props"]>) => void;
};

const names: Record<BuilderBlock["type"], string> = {
  hero: "Hero",
  text: "Text",
  features: "Features",
  cta: "Call to action",
};

export default function PropertiesPanel({ block, canEdit, onChange }: Props) {
  return (
    <aside
      aria-label="Section settings"
      className="border-t border-border xl:h-[calc(100dvh-64px)] xl:overflow-y-auto xl:border-t-0 xl:border-l"
    >
      {!block ? (
        <div className="flex flex-col gap-1 p-4">
          <h2 className="type-ui text-text">No section selected</h2>
          <p className="type-small text-text-muted">
            Click a section on the page to edit its text.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-col gap-1">
            <h2 className="type-ui text-text">{names[block.type]}</h2>
            {!canEdit ? (
              <p className="type-small text-text-muted">You can view this section but not edit it.</p>
            ) : null}
          </div>

          <fieldset disabled={!canEdit} className="flex flex-col gap-6">
            <Field>
              <FieldLabel htmlFor="prop-title">Heading</FieldLabel>
              <Input
                id="prop-title"
                value={block.props.title ?? ""}
                onChange={(event) => onChange({ title: event.target.value })}
              />
            </Field>

            {block.type !== "features" ? (
              <Field>
                <FieldLabel htmlFor="prop-body">
                  {block.type === "text" ? "Paragraph" : "Supporting text"}
                </FieldLabel>
                <Textarea
                  id="prop-body"
                  rows={4}
                  value={(block.type === "text" ? block.props.body : block.props.subtitle) ?? ""}
                  onChange={(event) =>
                    onChange(
                      block.type === "text"
                        ? { body: event.target.value }
                        : { subtitle: event.target.value }
                    )
                  }
                />
              </Field>
            ) : (
              <Field>
                <FieldLabel htmlFor="prop-items">Points</FieldLabel>
                <Textarea
                  id="prop-items"
                  rows={5}
                  value={(block.props.items ?? []).join("\n")}
                  onChange={(event) =>
                    onChange({
                      items: event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    })
                  }
                />
                <FieldDescription>One point per line.</FieldDescription>
              </Field>
            )}

            {block.type === "hero" || block.type === "cta" ? (
              <>
                <Field>
                  <FieldLabel htmlFor="prop-button">Button text</FieldLabel>
                  <Input
                    id="prop-button"
                    value={block.props.buttonLabel ?? ""}
                    onChange={(event) => onChange({ buttonLabel: event.target.value })}
                  />
                  <FieldDescription>Leave empty to hide the button.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="prop-href">Button link</FieldLabel>
                  <Input
                    id="prop-href"
                    type="url"
                    spellCheck={false}
                    placeholder="https://"
                    value={block.props.buttonHref ?? ""}
                    onChange={(event) => onChange({ buttonHref: event.target.value })}
                  />
                </Field>
              </>
            ) : null}
          </fieldset>
        </div>
      )}
    </aside>
  );
}
