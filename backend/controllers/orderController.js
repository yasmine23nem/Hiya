import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nemiri.yasminesara@gmail.com',
        pass: 'gibtcjhzqfgusxro'

    }
});

// Fonction utilitaire pour formater la date
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Vérification de la configuration email
transporter.verify(function (error, success) {
    if (error) {
        console.log("Erreur de configuration email:", error);
    } else {
        console.log("Configuration email réussie - Prêt à envoyer");
    }
});


export const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentMethod } = req.body;
        const currentDate = new Date();

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod,
            payment: false,
            date: currentDate
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Récupérer les informations de l'utilisateur
        const user = await userModel.findById(userId);

        // Préparer et envoyer l'email
        const mailOptions = {
            from: `${process.env.SHOP_NAME} <${process.env.SENDER_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🛍️ Nouvelle Commande #${newOrder._id}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #333; margin: 0;">${process.env.SHOP_NAME}</h1>
                        <p style="color: #666;">Confirmation de commande</p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h2 style="color: #2c3e50; margin-top: 0; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                            Détails de la Commande
                        </h2>
                        <p><strong>Numéro de commande:</strong> #${newOrder._id}</p>
                        <p><strong>Date:</strong> ${formatDate(currentDate)}</p>
                        
                        <h3 style="color: #2c3e50; margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                            Informations Client
                        </h3>
                        <p><strong>Nom complet:</strong> ${address.firstName} ${address.lastName}</p>
                        <p><strong>Email:</strong> ${address.email}</p>
                        <p><strong>Téléphone:</strong> ${address.phone}</p>
                        
                        <h3 style="color: #2c3e50; margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                            Adresse de Livraison
                        </h3>
                        <p>${address.street}</p>
                        <p>${address.city} ${address.zipcode}</p>
                        <p>${address.country}</p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="color: #2c3e50; margin-top: 0; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                            Récapitulatif de la Commande
                        </h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background-color: #3498db;">
                                    <th style="padding: 12px; text-align: left; color: white;">Produit</th>
                                    <th style="padding: 12px; text-align: center; color: white;">Qté</th>
                                    <th style="padding: 12px; text-align: right; color: white;">Prix unit.</th>
                                    <th style="padding: 12px; text-align: right; color: white;">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${items.map(item => `
                                    <tr style="border-bottom: 1px solid #ddd;">
                                        <td style="padding: 12px; text-align: left;">
                                            <div style="font-weight: bold;">${item.name}</div>
                                            <div style="color: #666; font-size: 0.9em;">Réf: ${item._id}</div>
                                        </td>
                                        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
                                        <td style="padding: 12px; text-align: right;">${item.price.toFixed(2)} €</td>
                                        <td style="padding: 12px; text-align: right;">${(item.price * item.quantity).toFixed(2)} €</td>
                                    </tr>
                                `).join('')}
                                <tr style="background-color: #f8f9fa; font-weight: bold;">
                                    <td colspan="3" style="padding: 12px; text-align: right;">Total</td>
                                    <td style="padding: 12px; text-align: right;">${amount.toFixed(2)} €</td>
                                </tr>
                            </tbody>
                        </table>

                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                            <p><strong>Mode de paiement:</strong> ${paymentMethod.toUpperCase()}</p>
                        </div>
                    </div>

                    <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
                        <p style="color: #666; margin: 0;">Merci pour votre commande!</p>
                        <p style="color: #666; margin: 5px 0 0;">L'équipe ${process.env.SHOP_NAME}</p>
                    </div>
                </div>
            `
        };

        // Envoyer l'email
        await transporter.sendMail(mailOptions);
        console.log('Email de confirmation envoyé');

        // Vider le panier de l'utilisateur
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({
            success: true,
            message: 'Commande créée avec succès',
            order: newOrder
        });

    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la passation de la commande',
            error: error.message
        });
    }
};
export const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('userId', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la commande', error });
    }
};

export const userOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await orderModel.find({ userId });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Aucune commande trouvée pour cet utilisateur' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes de l\'utilisateur', error });
    }
};