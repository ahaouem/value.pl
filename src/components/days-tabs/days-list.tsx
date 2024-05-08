"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/regular-tabs";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Day, DayType } from "./day";
import { DatePicker } from "./date-picker";

export default function DaysList({ firstDate }: { firstDate: Date }) {
	const [currentDateTab, setCurrentDateTab] = useState(
		new Date().toDateString()
	);
	const [currentWeekIndex, setCurrentWeekIndex] = useState(
		getCurrentWeekIndex({
			date: currentDateTab,
			disabled: false,
		} as DayType)
	);
	const [moodJournal, setMoodJournal] = useState<
		{
			dayDescription: string;
			mood: number;
			userId: string;
		}[]
	>([]);

	function getCalendarData(firstDate: Date): DayType[][] {
		const calendarData: DayType[][] = [];
		const currentDate = new Date();
		let currentDatePointer = new Date(firstDate);
		currentDatePointer.setHours(0, 0, 0, 0);
		// Find the nearest Monday to start the calendar
		while (currentDatePointer.getDay() !== 1) {
			currentDatePointer.setDate(currentDatePointer.getDate() - 1);
		}

		// Iterate through weeks
		while (currentDatePointer <= currentDate) {
			const week: DayType[] = [];

			// Iterate through days of the week
			for (let i = 0; i < 7; i++) {
				const dateString = currentDatePointer.toDateString();
				const dayOfWeek = currentDatePointer.toLocaleString("en-US", {
					weekday: "long",
				});
				const dayOfMonth = currentDatePointer.getDate();

				const isGreaterThanToday = currentDatePointer > currentDate;

				const day: DayType = {
					date: dateString,
					dayOfWeek: dayOfWeek,
					dayOfMonth: dayOfMonth,
					disabled: isGreaterThanToday,
				};

				week.push(day);
				currentDatePointer.setDate(currentDatePointer.getDate() + 1);
			}

			calendarData.push(week);
		}

		return calendarData;
	}

	function getCurrentWeekIndex(day: DayType) {
		const currentDate = new Date(day.date);
		const calendar = getCalendarData(firstDate);

		for (let i = 0; i < calendar.length; i++) {
			const week = calendar[i];

			if (week) {
				for (let j = 0; j < week.length; j++) {
					if (
						week[j] &&
						week[j]?.date === currentDate.toDateString()
					) {
						return i;
					}
				}
			}
		}

		return -1;
	}

	const calendar = getCalendarData(firstDate);

	console.log("calendar", calendar);

	return (
		<div>
			<div className='flex items-center justify-between sm:px-6'>
				<DatePicker
					months={[
						new Date(
							calendar?.[currentWeekIndex]?.[0]?.date ?? ""
						).toLocaleString("en-US", { month: "long" }),
						new Date(
							calendar?.[currentWeekIndex]?.[6]?.date ?? ""
						).toLocaleString("en-US", { month: "long" }),
					]}
					value={new Date(currentDateTab)}
					onChange={date => {
						setCurrentDateTab(date.toDateString());
						setCurrentWeekIndex(
							getCurrentWeekIndex({
								date: date.toDateString(),
								disabled: false,
							} as DayType)
						);
					}}
					disabled={[
						{
							after: new Date(),
							before: new Date(firstDate),
						},
					]}
				/>
				{currentDateTab !== new Date().toDateString() && (
					<Button
						variant='ghost'
						className='-mr-2 py-0'
						onClick={() => {
							setCurrentDateTab(new Date().toDateString());
							setCurrentWeekIndex(
								getCurrentWeekIndex({
									date: new Date().toDateString(),
									disabled: false,
								} as DayType)
							);
						}}>
						Go back to today
					</Button>
				)}
			</div>

			<Tabs
				className='flex items-center gap-x-1 bg-transparent'
				value={currentDateTab}
				onValueChange={setCurrentDateTab}>
				<div>
					<Button
						disabled={currentWeekIndex === 0}
						size='icon'
						variant='ghost'
						className='w-7'
						onClick={() => setCurrentWeekIndex(prev => prev - 1)}>
						<ChevronLeftIcon />
					</Button>
				</div>
				<TabsList
					loop={false}
					className='flex h-auto w-full items-center justify-between gap-x-2 divide-x px-0'>
					<div className='flex w-full gap-x-2'>
						{calendar[currentWeekIndex]?.map((day, dayIndex) => (
							<Day key={dayIndex} day={day} />
						))}
					</div>
				</TabsList>
				<div>
					<Button
						disabled={currentWeekIndex === calendar.length - 1}
						size='icon'
						variant='ghost'
						className='w-7'
						onClick={() => setCurrentWeekIndex(prev => prev + 1)}>
						<ChevronRightIcon />
					</Button>
				</div>
				<TabsContent value='account'>
					Make changes to your account here.
				</TabsContent>
				<TabsContent value='password'>
					Change your password here.
				</TabsContent>
			</Tabs>
		</div>
	);
}
