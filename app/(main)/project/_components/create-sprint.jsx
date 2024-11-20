"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createSprint } from "@/actions/sprints";
import { addDays, format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar1Icon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { sprintSchema } from "@/app/lib/validators";

const SprintCreationForm = ({ project }) => {
  const [showform, setShowform] = useState(false);
  const [daterange, setDaterange] = useState({
    from: new Date(),
    to: addDays(new Date(), 14),
  });
  const router = useRouter();

  console.log(project)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: `${project.key} - ${project.sprints?.length + 1}`,
      startDate: daterange.from,
      endDate: daterange.to,
    },
  });

  const { loading: createSprintLoading, fn: createSprintFn } =
    useFetch(createSprint);

  const onSubmit = async (data) => {
    await createSprintFn(project.id, {
      ...data,
      startDate: daterange.from,
      endDate: daterange.to,
    });
    setShowform(false);
    toast.success("Sprint created successfully");
    router.refresh();
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold mb-8 gradient-title">
          {project.name}
        </h1>
        <Button
          className="mt-2"
          onClick={() => setShowform(!showform)}
          variant={showform ? "destructive" : "default"}
        >
          {showform ? "Cancel" : "Create New Sprint"}
        </Button>
      </div>

      {showform && (
        <Card className="pt-4 mb-4">
          <CardContent>
            <form
              className="flex gap-4 items-end"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Sprint Name
                </label>
                <Input
                  id="name"
                  readOnly
                  className="bg-slate-950"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Sprint Duration
                </label>
                <Controller
                  control={control}
                  name="daterange"
                  render={({ field }) => {
                    return (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-left font-normal bg-slate-950 ${
                              !daterange && "text-muted-foreground"
                            }`}
                          >
                            <Calendar1Icon className="mr-2 h-4 w-4" />
                            {daterange.from && daterange.to ? (
                              format(daterange.from, "LLL dd, y") +
                              "-" +
                              format(daterange.to, "LLL dd, y")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto bg-slate-950"
                          align="start"
                        >
                          <DayPicker
                            mode="range"
                            selected={daterange}
                            onSelect={(range) => {
                              console.log(range);
                              if (range?.from && range?.to) {
                                setDaterange(range);
                                field.onChange(range);
                              }
                            }}
                            classNames={{
                              chevron: "fill-blue-500",
                              range_start: "bg-blue-700",
                              range_end: "bg-blue-700",
                              range_middle: "bg-blue-400",
                              day_button: "border-none",
                              today: "border-2 border-blue-700",
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
              </div>

              <Button type="submit" disabled={createSprintLoading}>
                {createSprintLoading ? "Creating..." : "Create Sprint"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SprintCreationForm;
