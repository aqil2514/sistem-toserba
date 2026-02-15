"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

interface ActivityLogItemProps {
  type: string;
  title: string;
  description?: string;
  createdAt?: string;
  FooterActions?: React.ReactNode;
}

export function ActivityLogItem({
  type,
  title,
  description,
  createdAt,
  FooterActions,
}: ActivityLogItemProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {type}
            </Badge>
            {createdAt && (
              <span className="text-xs text-muted-foreground">{createdAt}</span>
            )}
          </div>

          <span className="font-medium leading-none">{title}</span>

          {description && (
            <span className="text-sm text-muted-foreground wrap-break-word">
              {description}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>{FooterActions}</CardFooter>
    </Card>
  );
}

export function ActivityLogItemPreview() {
  return (
    <div className="space-y-3">
      <ActivityLogItem
        type="ORDER"
        title="Order status updated"
        description="Order #INV-001 status changed from Pending to Paid."
        createdAt="2 minutes ago"
      />

      <ActivityLogItem
        type="PRODUCT"
        title="New product created"
        description="Pulsa 50.000 successfully added to the system."
        createdAt="10 minutes ago"
      />

      <ActivityLogItem
        type="USER"
        title="User login"
        description="Admin logged in from 192.168.1.1"
        createdAt="1 hour ago"
      />
    </div>
  );
}
