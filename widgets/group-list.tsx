import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { GROUPS } from "@/lib/db";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function GroupList() {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {GROUPS.map((group) => (
        <li key={group} className="">
          <Card>
            <CardHeader>
              <div className="flex gap-4 items-center">
                <h3 className="text-2xl font-bold">{group}</h3>
                <Badge
                  variant="outline"
                  className="text-base font-bold text-muted-foreground"
                >
                  460
                </Badge>
              </div>

              <CardAction>
                <Button variant="outline" asChild>
                  <Link href={`/@${group}`}>
                    View <ExternalLink />
                  </Link>
                </Button>
              </CardAction>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
}
