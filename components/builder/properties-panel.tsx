"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import {
  Field,
  FieldContent,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  panelSlideRight,
  sectionReveal,
  staggerFast,
} from "@/lib/motion";
import type { BuilderBlock } from "@/types/builder";

type PropertiesPanelProps = {
  block: BuilderBlock | null;
  canEdit?: boolean;
  onChange: (updater: Partial<BuilderBlock["props"]>) => void;
};

export default function PropertiesPanel({
  block,
  canEdit = true,
  onChange,
}: PropertiesPanelProps) {
  if (!block) {
    return (
      <motion.aside
        variants={panelSlideRight}
        initial="hidden"
        animate="visible"
        className="h-full border-l border-white/8 bg-[#111522] p-4"
      >
        <div className="rounded-xl border border-dashed border-white/10 bg-[#1a1f2d] p-5">
          <h3 className="text-base font-semibold text-[#dee2f5]">
            Select a block
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#9aa6c0]">
            Click a section on the canvas to edit its content and CTA details.
          </p>
        </div>
      </motion.aside>
    );
  }

  return (
    <motion.aside
      variants={panelSlideRight}
      initial="hidden"
      animate="visible"
      className="h-full overflow-auto border-l border-white/8 bg-[#111522]"
    >
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        animate="visible"
        className="border-b border-white/8 px-4 py-4"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
          Properties
        </p>
        <h3 className="mt-2 text-lg font-bold capitalize text-[#dee2f5]">
          {block.type} block
        </h3>

        {!canEdit ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-start gap-2 rounded-lg bg-[#2a2418] px-3 py-3 text-sm text-[#ffcf7d]"
          >
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>You are in read-only mode for this builder.</span>
          </motion.div>
        ) : null}
      </motion.div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="space-y-5 p-4"
      >
        <motion.div variants={sectionReveal}>
          <Field>
            <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
              Title
            </FieldLabel>
            <FieldContent>
              <InputGroup className="min-h-11 rounded-xl border-white/8 bg-[#161b29]">
                <InputGroupInput
                  value={block.props.title ?? ""}
                  disabled={!canEdit}
                  onChange={(event) => onChange({ title: event.target.value })}
                  placeholder="Section title"
                  className="text-[#dee2f5] placeholder:text-white/20"
                />
              </InputGroup>
            </FieldContent>
          </Field>
        </motion.div>

        <motion.div variants={sectionReveal}>
          <Field>
            <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
              Subtitle
            </FieldLabel>
            <FieldContent>
              <InputGroup className="min-h-[96px] rounded-xl border-white/8 bg-[#161b29]">
                <InputGroupTextarea
                  value={block.props.subtitle ?? block.props.body ?? ""}
                  disabled={!canEdit}
                  onChange={(event) =>
                    onChange(
                      block.type === "text"
                        ? { body: event.target.value }
                        : { subtitle: event.target.value }
                    )
                  }
                  placeholder="Supporting text"
                  className="min-h-[96px] text-[#dee2f5] placeholder:text-white/20"
                />
              </InputGroup>
            </FieldContent>
          </Field>
        </motion.div>

        {block.type !== "features" ? (
          <>
            <motion.div variants={sectionReveal}>
              <Field>
                <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                  Button label
                </FieldLabel>
                <FieldContent>
                  <InputGroup className="min-h-11 rounded-xl border-white/8 bg-[#161b29]">
                    <InputGroupInput
                      value={block.props.buttonLabel ?? ""}
                      disabled={!canEdit}
                      onChange={(event) =>
                        onChange({ buttonLabel: event.target.value })
                      }
                      placeholder="Get started"
                      className="text-[#dee2f5] placeholder:text-white/20"
                    />
                  </InputGroup>
                </FieldContent>
              </Field>
            </motion.div>

            <motion.div variants={sectionReveal}>
              <Field>
                <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                  Button link
                </FieldLabel>
                <FieldContent>
                  <InputGroup className="min-h-11 rounded-xl border-white/8 bg-[#161b29]">
                    <InputGroupInput
                      value={block.props.buttonHref ?? ""}
                      disabled={!canEdit}
                      onChange={(event) =>
                        onChange({ buttonHref: event.target.value })
                      }
                      placeholder="#"
                      className="text-[#dee2f5] placeholder:text-white/20"
                    />
                  </InputGroup>
                </FieldContent>
              </Field>
            </motion.div>
          </>
        ) : (
          <motion.div variants={sectionReveal}>
            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Feature items
              </FieldLabel>
              <FieldContent>
                <InputGroup className="min-h-[140px] rounded-xl border-white/8 bg-[#161b29]">
                  <InputGroupTextarea
                    value={(block.props.items ?? []).join("\n")}
                    disabled={!canEdit}
                    onChange={(event) =>
                      onChange({
                        items: event.target.value
                          .split("\n")
                          .map((item) => item.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder={"Fast setup\nClear collaboration\nConfident publishing"}
                    className="min-h-[140px] text-[#dee2f5] placeholder:text-white/20"
                  />
                </InputGroup>
              </FieldContent>
            </Field>
          </motion.div>
        )}
      </motion.div>
    </motion.aside>
  );
}