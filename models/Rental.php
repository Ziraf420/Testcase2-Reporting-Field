<?php

namespace app\models;

use Yii;
use yii\db\Query;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "rental".
 *
 * @property int $rental_id
 * @property string $rental_date
 * @property int $inventory_id
 * @property int $customer_id
 * @property string|null $return_date
 * @property int $staff_id
 * @property string $last_update
 *
 * @property Customer $customer
 * @property Inventory $inventory
 * @property Payment[] $payments
 * @property Staff $staff
 */
class Rental extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'rental';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['rental_date', 'inventory_id', 'customer_id', 'staff_id'], 'required'],
            [['rental_date', 'return_date', 'last_update'], 'safe'],
            [['inventory_id', 'customer_id', 'staff_id'], 'integer'],
            [['rental_date', 'inventory_id', 'customer_id'], 'unique', 'targetAttribute' => ['rental_date', 'inventory_id', 'customer_id']],
            [['customer_id'], 'exist', 'skipOnError' => true, 'targetClass' => Customer::class, 'targetAttribute' => ['customer_id' => 'customer_id']],
            [['inventory_id'], 'exist', 'skipOnError' => true, 'targetClass' => Inventory::class, 'targetAttribute' => ['inventory_id' => 'inventory_id']],
            [['staff_id'], 'exist', 'skipOnError' => true, 'targetClass' => Staff::class, 'targetAttribute' => ['staff_id' => 'staff_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'rental_id' => 'Rental ID',
            'rental_date' => 'Rental Date',
            'inventory_id' => 'Title',
            'customer_id' => 'Customer Name',
            'return_date' => 'Return Date',
            'staff_id' => 'Staff Name',
            'last_update' => 'Last Update',
            'first_name' =>  'First Name',
        ];
    }

    /**
     * Gets query for [[Customer]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCustomer()
    {
        return $this->hasOne(Customer::class, ['customer_id' => 'customer_id']);
    }

    /**
     * Gets query for [[Inventory]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getInventory()
    {
        return $this->hasOne(Inventory::class, ['inventory_id' => 'inventory_id']);
    }

    /**
     * Gets query for [[Payments]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getPayments()
    {
        return $this->hasMany(Payment::class, ['rental_id' => 'rental_id']);
    }

    /**
     * Gets query for [[Staff]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getStaff()
    {
        return $this->hasOne(Staff::class, ['staff_id' => 'staff_id']);
    }

    /**
     * Summarizes transaction count by inventory, store, and film.
     * @return array the summary
     */
    public static function summarizeTransactionCountByInventoryStoreFilm()
    {
        $summary = [];

        $rentals = Rental::find()
            ->select(['inventory_id', 'store_id', 'film_id', 'COUNT(*) AS transaction_count'])
            ->joinWith('inventory.store') // Join with inventory and store
            ->groupBy(['inventory_id', 'store_id', 'film_id'])
            ->asArray()
            ->all();

        foreach ($rentals as $rental) {
            $inventoryId = $rental['inventory_id'];
            $storeId = $rental['store_id'];
            $filmId = $rental['film_id'];
            $transactionCount = $rental['transaction_count'];

            if (!isset($summary[$inventoryId][$storeId][$filmId])) {
                $summary[$inventoryId][$storeId][$filmId] = 0;
            }

            $summary[$inventoryId][$storeId][$filmId] += $transactionCount;
        }

        return $summary;
    }
    public function SearchingReport($film_id,$staff_id,$rental_date,$return_date){
        $query = new Query();
        $query->select(['rental.rental_date', 'rental.return_date', 'st.first_name', 'st.last_name', 'film.title'])
            ->from('rental')
            ->innerJoin('staff as st', 'rental.staff_id = st.staff_id')
            ->innerJoin('film', 'film.film_id = rental.film_id')
            ->orWhere(['like', 'rental.rental_date', $rental_date])
            ->orWhere(['like', 'rental.return_date', $return_date])
            ->orWhere(['like', 'rental.staff_id', $staff_id])
            ->orWhere(['like', 'rental.film_id', $film_id])
            ->limit(10); // misalnya, batasi hasil hingga 10 record
    
        $command = $query->createCommand();
        $data = $command->queryAll();
    
        return $data;
    }
    // public function getFilmTitle(){
    //     $film=$this->inventory->film;
    //     return $film->title;
    // }
    public function getStaffName(){
        $staff = $this->staff;
        return $staff->first_name . ' ' . $staff->last_name;
    }
    public function getCustomerName(){
        $customer = $this->customer;
        return $customer->first_name .' '. $customer->last_name;
    }
      
}