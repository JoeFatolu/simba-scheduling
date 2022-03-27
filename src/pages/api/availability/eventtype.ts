import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  if (req.method == "POST" ) {
    const data = {
      title: req.body.title,
      slug: req.body.slug.trim(),
      description: req.body.description,
      length: parseInt(req.body.length),
      hidden: req.body.hidden,
      requiresConfirmation: req.body.requiresConfirmation,
      locations: req.body.locations,
      eventName: req.body.eventName,
      periodType: req.body.periodType,
      periodDays: req.body.periodDays,
      periodStartDate: req.body.periodStartDate,
      periodEndDate: req.body.periodEndDate,
      periodCountCalendarDays: req.body.periodCountCalendarDays,
      minimumBookingNotice: req.body.minimumBookingNotice,
    };

   
    if (req.method == "POST") {
      const eventType = await prisma.eventType.create({
        data: {
          ...data,
        },
      });
      res.status(201).json({ eventType });
    }  
  }

}
