import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new Product',
        href: '/products/create',
    },
];

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        price: '',
        description: '',
    });

    const ErrorComponent = (
        <div>
            <p style={{ fontWeight: 'bold' }}>Error!</p>
            <ul>
                {Object.entries(errors).map(([key, message]) => (
                    <li key={key}>- {message as string}</li>
                ))}
            </ul>
        </div>
    );

    useEffect(() => {
        if (Object.keys(errors).length > 0 && processing === false) {
            toast.error(ErrorComponent, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
        }
    }, [processing]);

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Create" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSumbit} className="flex flex-col gap-4">
                    <Label htmlFor="product name">Name</Label>
                    <Input
                        placeholder="Product Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <Label htmlFor="product price">Price</Label>
                    <span className="currency-input">
                        <span>$</span>
                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            pattern="^\d*(\.\d{0,2})?$"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </span>
                    <Label htmlFor="product description">Description</Label>
                    <Textarea
                        placeholder="Product Description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <div>
                        <Button>Add Product</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
