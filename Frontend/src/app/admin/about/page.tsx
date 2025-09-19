"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash } from "lucide-react";
import {
  AboutHeroType,
  AboutOverviewType,
  ExhibitionItem,
} from "@/types/admin-about";
import { DynamicPart } from "@/types/dynamic-part";

/* ---- Extend types with local-only props ---- */
type HeroWithFile = AboutHeroType & { _file?: File; _preview?: string };
type OverviewWithFile = AboutOverviewType & { _file?: File; _preview?: string };

export default function AdminAboutPage() {
  const [hero, setHero] = useState<HeroWithFile | null>(null);
  const [overview, setOverview] = useState<OverviewWithFile | null>(null);
  const [exhibitions, setExhibitions] = useState<ExhibitionItem[]>([]);

  /* -------- Fetch about data from backend -------- */
  const fetchAboutData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/about");
      const data = await res.json();
      if (data.status) {
        const { hero, overview, exhibitions } = data.data;

        setHero({
          image: hero?.image_1 || "/placeholder.jpg",
          title: hero?.title_1 || "",
          subtitle: hero?.title_2 || "",
          overlay: true,
        });

        setOverview({
          postTitle: overview?.title_1 || "",
          postHref: overview?.link_1 || "",
          postImage: overview?.image_1 || "/placeholder.jpg",
          postExcerpt: overview?.title_2 || "",
          ctaLabel: overview?.link_title_1 || "",
          paragraphs: overview?.description
            ? overview.description
            : [],
        });

        setExhibitions(
          exhibitions.map((ex: DynamicPart) => ({
            year: parseInt(ex?.title_1 || "") || new Date().getFullYear(),
            description: ex.description || "",
            href: ex.link_1 || "",
          }))
        );
      }
    } catch (err) {
      console.error("❌ Error fetching about data:", err);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  /* --------- Handle image upload with preview --------- */
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: (file: File, preview: string) => void
  ) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      cb(file, preview);
    }
  };

  /* -------- Save Hero -------- */
  const saveHero = async () => {
    if (!hero) return;
    try {
      const formData = new FormData();
      formData.append("title_1", hero.title);
      formData.append("subtitle", hero.subtitle || "");
      formData.append("overlay", String(hero.overlay));
      if (hero._file) formData.append("image", hero._file);

      const res = await fetch("http://localhost:5000/api/admin/about/hero", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || "Hero saved!");
      await fetchAboutData();
    } catch (err) {
      console.error("❌ Error saving Hero:", err);
    }
  };

  /* -------- Save Overview -------- */
  const saveOverview = async () => {
    if (!overview) return;
    try {
      const formData = new FormData();
      formData.append("postTitle", overview.postTitle);
      formData.append("postHref", overview.postHref);
      formData.append("postExcerpt", overview.postExcerpt);
      formData.append("ctaLabel", overview.ctaLabel);
      formData.append("paragraphs", overview?.paragraphs);
      if (overview._file) formData.append("image", overview._file);

      const res = await fetch(
        "http://localhost:5000/api/admin/about/overview",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      alert(data.message || "Overview saved!");
      await fetchAboutData();
    } catch (err) {
      console.error("❌ Error saving Overview:", err);
    }
  };

  /* -------- Save Exhibitions -------- */
  const saveExhibitions = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/about/exhibitions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: exhibitions }),
        }
      );
      const data = await res.json();
      alert(data.message || "Exhibitions saved!");
      await fetchAboutData();
    } catch (err) {
      console.error("❌ Error saving Exhibitions:", err);
    }
  };

  /* -------- UI -------- */
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="w-full h-56 rounded-lg overflow-hidden border">
            <img
              src={
                hero?._preview ||
                `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}${hero?.image}`
              }
              alt="Hero Preview"
              className="object-cover w-full h-full"
            />
          </div>
          <Label>Upload Hero Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(e, (file, preview) =>
                setHero({ ...hero!, _file: file, _preview: preview })
              )
            }
          />
          <Label>Title</Label>
          <Input
            value={hero?.title || ""}
            onChange={(e) => setHero({ ...hero!, title: e.target.value })}
          />
          <Label>Subtitle</Label>
          <Input
            value={hero?.subtitle || ""}
            onChange={(e) => setHero({ ...hero!, subtitle: e.target.value })}
          />
          <div className="flex justify-end">
            <Button onClick={saveHero} className="bg-amber-500 text-black">
              Save Hero
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Overview Section
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="w-full h-56 rounded-lg overflow-hidden border">
            <img
              src={
                overview?._preview ||
                `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}${hero?.image}`
              }
              alt="Overview Preview"
              className="object-cover w-full h-full"
            />
          </div>
          <Label>Upload Overview Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(e, (file, preview) =>
                setOverview({
                  ...overview!,
                  postImage: preview,
                  _file: file,
                  _preview: preview,
                })
              )
            }
          />
          <Label>Post Title</Label>
          <Input
            value={overview?.postTitle || ""}
            onChange={(e) =>
              setOverview({ ...overview!, postTitle: e.target.value })
            }
          />
          <Label>Post Link</Label>
          <Input
            value={overview?.postHref || ""}
            onChange={(e) =>
              setOverview({ ...overview!, postHref: e.target.value })
            }
          />
          <Label>Excerpt</Label>
          <Textarea
            value={overview?.postExcerpt || ""}
            onChange={(e) =>
              setOverview({ ...overview!, postExcerpt: e.target.value })
            }
          />
          <Label>CTA Label</Label>
          <Input
            value={overview?.ctaLabel || ""}
            onChange={(e) =>
              setOverview({ ...overview!, ctaLabel: e.target.value })
            }
          />
          <Label>Paragraphs</Label>
          <Textarea
            value={overview?.paragraphs || ""}
            onChange={(e) =>
              setOverview({
                ...overview!,
                paragraphs: e.target.value,
              })
            }
          />
          <div className="flex justify-end">
            <Button onClick={saveOverview} className="bg-amber-500 text-black">
              Save Overview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exhibitions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Exhibitions Section
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {exhibitions.map((ex, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <Input
                type="number"
                className="col-span-2 text-black"
                value={ex.year}
                onChange={(e) => {
                  const copy = [...exhibitions];
                  copy[i].year = Number(e.target.value);
                  setExhibitions(copy);
                }}
              />
              <Input
                className="col-span-8 text-black"
                value={ex.description}
                onChange={(e) => {
                  const copy = [...exhibitions];
                  copy[i].description = e.target.value;
                  setExhibitions(copy);
                }}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() =>
                  setExhibitions(exhibitions.filter((_, idx) => idx !== i))
                }
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              setExhibitions([
                ...exhibitions,
                { year: new Date().getFullYear(), description: "" },
              ])
            }
            className="flex items-center gap-2 bg-amber-500 text-black"
          >
            <PlusCircle className="w-4 h-4" />
            Add Exhibition
          </Button>
          <div className="flex justify-end mt-4">
            <Button
              onClick={saveExhibitions}
              className="bg-amber-500 text-black"
            >
              Save Exhibitions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
