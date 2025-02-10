'use client'

import { Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTransition } from 'react'
import { createQuery } from '@/lib/queryActions'
import { useToast } from '@/hooks/use-toast'

export default function QueryBuilder() {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)

        startTransition(async () => {
            try {
                await createQuery(formData)
                toast({
                    title: "Query created",
                    description: "Your query has been successfully created and saved.",
                })
                form.reset()
            } catch (error) {
                console.error('Error creating query:', error)

            }
        })
    }

    return (
        <Card className="w-full max-w-2xl mx-auto mt-20">
            <CardHeader>
                <CardTitle>Creador de búsqueda</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre de la búqueda</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Dale un nombre a tu búsqueda"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="included_words">Palabras a monitorizar</Label>
                        <Input
                            id="included_words"
                            name="included_words"
                            placeholder="Introduce las palabras a monitorizar (separadas por comas)"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excluded_words">Palabras a excluir</Label>
                        <Input
                            id="excluded_words"
                            name="excluded_words"
                            placeholder="Introduce las palabras a excluir (separadas por comas)"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Query...
                            </>
                        ) : (
                            'Create Query'
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

