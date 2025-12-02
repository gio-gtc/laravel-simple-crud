import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface Props {
    product: Product;
}

export default function EditProduct({
    product: { name, id, price, description },
}: Props) {
    const { data, setData, put, errors, processing } = useForm({
        name: name,
        price: price,
        description: description,
    });

    useEffect(() => {
        if (Object.keys(errors).length > 0 && processing === false)
            handleError();
    }, [processing]);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/products/${id}/update`);
    };

    const handleError = () => {
        toast.error(ErrorComponent, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
        });
    };

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

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Edit Product', href: `/products/${id}/edit` },
            ]}
        >
            <Head title="Product Create" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
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
                            pattern="^\d*(\.\d{0,2})?$"
                            placeholder="0.00"
                            value={data.price}
                            onChange={(e) =>
                                setData(
                                    'price',
                                    parseFloat(
                                        parseFloat(e.target.value).toFixed(2),
                                    ),
                                )
                            }
                        />
                    </span>
                    <Label htmlFor="product description">Description</Label>
                    <Textarea
                        placeholder="Product Description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <div>
                        <Button>Edit Product</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
