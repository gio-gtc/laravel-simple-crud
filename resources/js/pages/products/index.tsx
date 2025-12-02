import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Product, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { SquarePen, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export interface pageProps {
    flash: {
        message?: string;
    };
    products: Product[];
}

export default function Index() {
    const { flash, products } = usePage().props as pageProps;
    const { processing, delete: destroy } = useForm();

    useEffect(() => {
        toast.info(flash.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    }, [flash]);

    const handleDelete = (id: number, name: string) => {
        if (
            confirm(`Are you sure you want to delete product: ${id} - ${name}?`)
        ) {
            destroy(`/products/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-4">
                <Link href={'/products/create'}>
                    <Button>Create a Prouct</Button>
                </Link>
            </div>
            <div className="m-4">
                {products.length > 0 ? (
                    <Table>
                        <TableCaption>Store Stock</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Desciption</TableHead>
                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map(
                                ({ id, name, price, description }) => {
                                    return (
                                        <TableRow key={id}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{price}</TableCell>
                                            <TableCell>{description}</TableCell>
                                            <TableCell className="space-x-2 text-center">
                                                <Link
                                                    href={`/products/${id}/edit`}
                                                    className="bg-slate-500 text-white hover:bg-slate-700"
                                                >
                                                    <Button>
                                                        <SquarePen />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    disabled={processing}
                                                    onClick={() =>
                                                        handleDelete(id, name)
                                                    }
                                                    className="bg-red-500 text-white hover:bg-red-700"
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                },
                            )}
                        </TableBody>
                    </Table>
                ) : (
                    <>No Items Available</>
                )}
            </div>
        </AppLayout>
    );
}
