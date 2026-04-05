"use client";

import React, { memo } from "react";
import clsx from "clsx";
import { registerStep } from "../lib/types/auth";

interface ProgressStepsProps {
  steps: registerStep[];
  currentStep: registerStep;
  className?: string;
}

function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div
      className={clsx("progress flex items-center px-20 xl:px-38 mb-2.5", className)}
    >
      {steps.map((s, index) => (
        <React.Fragment key={s}>
          <div
            className={clsx("step", {
              completed: index < currentStepIndex,
              active: index === currentStepIndex,
            })}
          />
          {index !== steps.length - 1 && (
            <div
              className={clsx("line flex-1", {
                completed: index < currentStepIndex,
              })}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default memo(ProgressSteps);
