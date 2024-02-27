<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Rental;

/**
 * RentalSearch represents the model behind the search form of `app\models\Rental`.
 */
class RentalSearch extends Rental
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['rental_id'], 'integer'],
            [['rental_date', 'return_date', 'last_update','inventory_id', 'customer_id', 'staff_id'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Rental::find();
        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);
        //print_r($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'rental_id' => $this->rental_id,
            'inventory_id' => $this->inventory_id,
            'customer_id' => $this->customer_id,
            'last_update' => $this->last_update,
        ]);

        // Staff ID harus dicek terlebih dahulu apakah benar-benar berupa integer
        if ($this->staff_id !== '') {
            $query->andFilterWhere(['staff_id' => $this->staff_id]);
        }

        // Filter rentang tanggal untuk rental_date
        if (!empty($this->rental_date)) {
            $dateRange = explode(' - ', $this->rental_date);
            $startDate = date('Y-m-d 00:00:00', strtotime($dateRange[0])); // Konversi format PM/AM ke format 24 jam
            $endDate = date('Y-m-d 23:59:59', strtotime($dateRange[1])); // Konversi format PM/AM ke format 24 jam
            $query->andFilterWhere(['between', 'rental_date', $startDate, $endDate]);
            //echo $dateRange[0];
            //echo $dateRange[1];
        }
        $query = Rental::find()->joinWith(['customer', 'staff']); // Menambahkan join dengan tabel staff

        // ...
        
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);
        
        // ...
        
        // Sorting by customer first_name and last_name
        $dataProvider->sort->attributes['customerName'] = [
            'asc' => ['customer.first_name' => SORT_ASC, 'customer.last_name' => SORT_ASC],
            'desc' => ['customer.first_name' => SORT_DESC, 'customer.last_name' => SORT_DESC],
        ];
        
        // Sorting by staff first_name and last_name
        $dataProvider->sort->attributes['staffName'] = [
            'asc' => ['staff.first_name' => SORT_ASC, 'staff.last_name' => SORT_ASC],
            'desc' => ['staff.first_name' => SORT_DESC, 'staff.last_name' => SORT_DESC],
        ];
        
        return $dataProvider;
    }
}
